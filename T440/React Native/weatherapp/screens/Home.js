import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [showInput, setShowInput] = useState(false);
  const API_KEY = 'your-openweathermap-api-key'; // Replace with your key

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        fetchWeatherByCoords(location.coords.latitude, location.coords.longitude);
      } else {
        checkPreference();
      }
    })();
  }, []);

  const checkPreference = async () => {
    const preferredCity = await AsyncStorage.getItem('preferredCity');
    if (preferredCity) {
      fetchWeatherByCity(preferredCity);
    } else {
      setShowInput(true);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    setWeather(res.data);
  };

  const fetchWeatherByCity = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      await AsyncStorage.setItem('preferredCity', cityName);
      setShowInput(false);
    } catch (e) {
      alert('Invalid city. Try again.');
    }
  };

  const getBackgroundImage = () => {
    if (!weather) return 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b';
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes('rain')) return 'https://images.unsplash.com/photo-1519692933481-e162a57d6721';
    if (condition.includes('cloud')) return 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63';
    return 'https://images.unsplash.com/photo-1592210454359-9047f67a7cc1'; // Sunny
  };

  return (
    <ImageBackground source={{ uri: getBackgroundImage() }} style={styles.background}>
      <View style={styles.container}>
        {showInput ? (
          <>
            <Text style={styles.title}>Enter Your City</Text>
            <TextInput
              style={styles.input}
              placeholder="City Name"
              value={city}
              onChangeText={setCity}
            />
            <Button title="Set Location" onPress={() => fetchWeatherByCity(city)} color="#FFD700" />
          </>
        ) : weather ? (
          <>
            <Text style={styles.city}>{weather.name}</Text>
            <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
            <Text style={styles.condition}>{weather.weather[0].description}</Text>
            <Button
              title="Details"
              onPress={() => navigation.navigate('WeatherDetails', { weather })}
              color="#FFD700"
            />
          </>
        ) : (
          <Text style={styles.title}>Loading...</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center' },
  container: { padding: 20, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 15, margin: 20 },
  title: { fontSize: 28, color: '#FFF', textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  input: { backgroundColor: '#FFF', padding: 12, marginVertical: 10, borderRadius: 8 },
  city: { fontSize: 34, color: '#FFD700', textAlign: 'center', fontWeight: 'bold' },
  temp: { fontSize: 54, color: '#FFF', textAlign: 'center', marginVertical: 10 },
  condition: { fontSize: 22, color: '#FFF', textAlign: 'center', marginBottom: 20 },
});

export default Home;