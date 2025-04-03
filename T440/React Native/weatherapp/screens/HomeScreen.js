import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [showInput, setShowInput] = useState(false);
    const API_KEY = '7be661621bd1b79439fc2c635d4a6391';

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

    const getBackgroundImage = (weather) => {
        if (!weather || !weather.weather || !weather.weather[0]) {
            return require('../assets/default.png');
        }

        const condition = weather.weather[0].main.toLowerCase();
        const currentHour = new Date().getHours(); // Local device time (0-23)
        const isDay = currentHour >= 6 && currentHour < 18; // 6 AM to 6 PM as day

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
                ? require('../assets/sun.png')
                : require('../assets/moon.png');
        }
    };

    return (
        <ImageBackground source={getBackgroundImage(weather)} style={styles.background}>
            <View style={styles.container}>
                {(() => {
                    if (showInput) {
                        return (
                            <>
                                <Text style={styles.title}>Enter Your City</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="City Name"
                                    value={city}
                                    onChangeText={setCity}
                                />
                                <Button
                                    title="Set Location"
                                    onPress={() => fetchWeatherByCity(city)}
                                    color="#FFD700"
                                />
                            </>
                        );
                    } else if (weather) {
                        return (
                            <>
                                <Text style={styles.city}>{weather.name}</Text>
                                <Text style={styles.condition}>{weather.sys.country}</Text>
                                <Text style={styles.condition}>{weather.weather[0].description}</Text>
                                <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
                                <Text style={styles.detail}>Feels like: {weather.main.feels_like}°C</Text>
                                <Text style={styles.detail}>Humidity: {weather.main.humidity}%</Text>
                                <Text style={styles.detail}>Wind: {weather.wind.speed} m/s</Text>
                            </>
                        );
                    } else {
                        return <Text style={styles.title}>Loading...</Text>;
                    }
                })()}
            </View>
        </ImageBackground>);
};

const styles = StyleSheet.create({
    background: { flex: 1, justifyContent: 'center' },
    container: { padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: 15, margin: 20 },
    title: { fontSize: 28, color: '#FFF', textAlign: 'center', marginBottom: 8, fontWeight: 'bold' },
    input: { backgroundColor: '#FFF', padding: 12, marginVertical: 10, borderRadius: 8 },
    city: { fontSize: 34, color: '#FFD700', textAlign: 'center', fontWeight: 'bold' },
    temp: { fontSize: 54, color: '#FFF', textAlign: 'center', marginVertical: 10 },
    condition: { fontSize: 22, color: '#FFF', textAlign: 'center', marginBottom: 20 },
    detail: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
        marginVertical: 5,
    },
});

export default HomeScreen;