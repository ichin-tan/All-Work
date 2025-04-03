import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { styles as globalStyles, headerOptions } from '../global/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserService, AuthService } from '../helper/FirebaseHelper';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const API_KEY = '7be661621bd1b79439fc2c635d4a6391';

  useEffect(() => {
    navigation.setOptions({
      ...headerOptions,
      title: 'Favorites',
    });
    fetchFavorites();
  }, [navigation]);

  const fetchFavorites = async () => {
    const user = await AuthService.getCurrentUser();
    if (!user) return;

    setLoading(true);
    try {
      const favNames = await UserService.getFavorites(user.uid);
      setFavorites(favNames);
      await fetchWeatherForFavorites(favNames);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherForFavorites = async (favNames) => {
    try {
      const weatherMap = {};
  
      for (const city of favNames) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          weatherMap[response.data.name] = response.data;
        } catch (err) {
          alert(`Error fetching weather for ${city}:`)
        }
      }
  
      setWeatherData(weatherMap);
    } catch (error) {
      alert('Error fetching weather');
    }
  };
  
  const addFavorite = async () => {
    if (!city) {
      alert('Please enter a city name');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const cityName = res.data.name;
      const user = await AuthService.getCurrentUser();
      const updatedFavorites = await UserService.addFavorite(user.uid, cityName);
      setFavorites(updatedFavorites);
      setWeatherData(prev => ({ ...prev, [cityName]: res.data }));
      setCity('');
    } catch (e) {
      alert('Invalid city or error adding favorite.');
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (cityName) => {
    try {
      setLoading(true);
      const user = await AuthService.getCurrentUser();
      const updatedFavorites = await UserService.removeFavorite(user.uid, cityName);
      setFavorites(updatedFavorites);
      setWeatherData(prev => {
        const newData = { ...prev };
        delete newData[cityName];
        return newData;
      });
    } finally {
      setLoading(false);
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={[globalStyles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
      onPress={() => navigation.navigate('WeatherDetailScreen', { weather: weatherData[item] })}
    >
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item}</Text>
        {weatherData[item] && (
          <Text style={{ color: '#212529' }}>
            {Math.round(weatherData[item].main.temp)}°C | {weatherData[item].weather[0].description}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={() => removeFavorite(item)}>
        <Icon name="delete" size={24} color='#F72585' />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.card, { marginTop: 20 }]}>
        <Text style={globalStyles.title}>Add Favorite City</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[globalStyles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity
            style={[globalStyles.button, { paddingHorizontal: 16 }]}
            onPress={addFavorite}
            disabled={loading}
          >
            <Icon name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {loading && favorites.length === 0 ? (
        <ActivityIndicator size="large" color='#4361EE' style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item}
          renderItem={renderFavoriteItem}
          contentContainerStyle={{ padding: 8 }}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#212529' }}>
              No favorite cities yet. Add some!
            </Text>
          }
        />
      )}
    </View>
  );
};

export default FavoritesScreen;