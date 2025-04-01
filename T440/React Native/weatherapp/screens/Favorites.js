import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../Config';
import axios from 'axios';

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const API_KEY = 'your-openweathermap-api-key';

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const favNames = userDoc.data().favorites || [];
      setFavorites(favNames);
      fetchWeatherForFavorites(favNames);
    }
  };

  const fetchWeatherForFavorites = async (favNames) => {
    const weatherPromises = favNames.map(city =>
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    );
    const results = await Promise.all(weatherPromises);
    const weatherMap = results.reduce((acc, res) => {
      acc[res.data.name] = res.data;
      return acc;
    }, {});
    setWeatherData(weatherMap);
  };

  const addFavorite = async () => {
    if (!city) {
      alert('Please enter a city name');
      return;
    }
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const cityName = res.data.name;
      const user = auth.currentUser;
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const currentFavorites = userDoc.data().favorites || [];

      if (!currentFavorites.includes(cityName)) {
        const updatedFavorites = [...currentFavorites, cityName];
        await updateDoc(userRef, { favorites: updatedFavorites });
        setFavorites(updatedFavorites);
        setWeatherData(prev => ({ ...prev, [cityName]: res.data }));
      }
      setCity('');
    } catch (e) {
      alert('Invalid city or error adding favorite.');
    }
  };

  const removeFavorite = async (cityName) => {
    const user = auth.currentUser;
    const userRef = doc(db, 'users', user.uid);
    const updatedFavorites = favorites.filter(fav => fav !== cityName);
    await updateDoc(userRef, { favorites: updatedFavorites });
    setFavorites(updatedFavorites);
    setWeatherData(prev => {
      const newData = { ...prev };
      delete newData[cityName];
      return newData;
    });
  };

  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Favorites</Text>
        <TextInput
          style={styles.input}
          placeholder="Search a City"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Add" onPress={addFavorite} color="#FFD700" />
        <FlatList
          data={favorites}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <View style={styles.favItem}>
              <Text
                style={styles.favText}
                onPress={() => navigation.navigate('WeatherDetails', { weather: weatherData[item] })}
              >
                {item}: {weatherData[item] ? Math.round(weatherData[item].main.temp) : 'Loading'}°C
              </Text>
              <Button title="Remove" onPress={() => removeFavorite(item)} color="#FF4500" />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 20, backgroundColor: 'rgba(0,0,0,0.6)', flex: 1, margin: 20, borderRadius: 15 },
  title: { fontSize: 28, color: '#FFD700', textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  input: { backgroundColor: '#FFF', padding: 12, marginVertical: 10, borderRadius: 8 },
  favItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#1E90FF', marginVertical: 5, borderRadius: 8 },
  favText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default Favorites;