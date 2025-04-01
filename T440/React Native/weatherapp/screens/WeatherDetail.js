import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const WeatherDetail = ({ route }) => {
  const { weather } = route.params;

  const getBackgroundImage = () => {
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes('rain')) return 'https://images.unsplash.com/photo-1519692933481-e162a57d6721';
    if (condition.includes('cloud')) return 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63';
    return 'https://images.unsplash.com/photo-1592210454359-9047f67a7cc1';
  };

  return (
    <ImageBackground source={{ uri: getBackgroundImage() }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.city}>{weather.name}</Text>
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
        <Text style={styles.condition}>{weather.weather[0].description}</Text>
        <Text style={styles.detail}>Humidity: {weather.main.humidity}%</Text>
        <Text style={styles.detail}>Wind: {weather.wind.speed} m/s</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center' },
  container: { padding: 20, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 15, margin: 20 },
  city: { fontSize: 34, color: '#FFD700', textAlign: 'center', fontWeight: 'bold' },
  temp: { fontSize: 54, color: '#FFF', textAlign: 'center', marginVertical: 10 },
  condition: { fontSize: 22, color: '#FFF', textAlign: 'center', marginBottom: 20 },
  detail: { fontSize: 18, color: '#FFF', textAlign: 'center', marginVertical: 5 },
});

export default WeatherDetail;