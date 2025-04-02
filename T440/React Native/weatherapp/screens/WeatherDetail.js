import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
// import { weatherImages } from './Home';

const WeatherDetail = ({ route }) => {
    const { weather } = route.params;
    const [imageLoaded, setImageLoaded] = useState(false); // Track image load state

    const getBackgroundImage = (weather) => {
        if (!weather || !weather.weather || !weather.weather[0]) {
          return require('../assets/default.png'); // Fallback if weather data is invalid
        }
      
        const condition = weather.weather[0].main.toLowerCase();
        const currentTime = weather.dt; // Current time in Unix timestamp (seconds)
        const sunrise = weather.sys.sunrise; // Sunrise time in Unix timestamp
        const sunset = weather.sys.sunset; // Sunset time in Unix timestamp
      
        // Determine if it's day or night
        const isDay = currentTime >= sunrise && currentTime < sunset;
      
        if (condition.includes('rain')) {
          return isDay
            ? require('../assets/rain-day.png')
            : require('../assets/rain-night.png');
        } else if (condition.includes('cloud')) {
          return isDay
            ? require('../assets/cloud-day.png')
            : require('../assets/cloud-night.png');
        } else {
          return isDay
            ? require('../assets/sun.png') // Clear day
            : require('../assets/moon.png'); // Clear night
        }
      };
    const backgroundImage = getBackgroundImage(weather); // Compute once outside render

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
        >
            {!imageLoaded ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFD700" />
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.city}>{weather.name}</Text>
                    <Text style={styles.condition}>{weather.sys.country}</Text>
                    <Text style={styles.condition}>{weather.weather[0].description}</Text>
                    <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
                    <Text style={styles.detail}>Feels like: {weather.main.feels_like}°C</Text>
                    <Text style={styles.detail}>Humidity: {weather.main.humidity}%</Text>
                    <Text style={styles.detail}>Wind: {weather.wind.speed} m/s</Text>
                </View>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, justifyContent: 'center' },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Black background during load
    },
    container: {
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 15,
        margin: 20,
    },
    city: {
        fontSize: 34,
        color: '#FFD700',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 54,
        color: '#FFF',
        textAlign: 'center',
        marginVertical: 10,
    },
    condition: {
        fontSize: 22,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    detail: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
        marginVertical: 5,
    },
});

export default WeatherDetail;