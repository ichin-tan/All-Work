import axios from 'axios';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = '7be661621bd1b79439fc2c635d4a6391';

export const WeatherApi = {
  async getCurrentLocationWeather() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        return this.getWeatherByCoords(location.coords.latitude, location.coords.longitude);
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  async getWeatherByCoords(lat, lon) {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async getWeatherByCity(cityName) {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      await AsyncStorage.setItem('preferredCity', cityName);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async getPreferredCityWeather() {
    try {
      const preferredCity = await AsyncStorage.getItem('preferredCity');
      if (preferredCity) {
        return this.getWeatherByCity(preferredCity);
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
};

export const getWeatherIcon = (condition) => {
  if (!condition) return 'weather-sunny';
  condition = condition.toLowerCase();
  if (condition.includes('rain')) return 'opacity';
  if (condition.includes('cloud')) return 'cloud';
  if (condition.includes('sun')) return 'sunny';
  return 'sunny';
};