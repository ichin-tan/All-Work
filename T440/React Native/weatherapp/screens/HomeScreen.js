import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles as globalStyles, headerOptions } from '../global/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [loading, setLoading] = useState(true);
    const API_KEY = '7be661621bd1b79439fc2c635d4a6391';

    useEffect(() => {
        navigation.setOptions({
            ...headerOptions,
            title: 'Weather',
        });
        
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                await fetchWeatherByCoords(location.coords.latitude, location.coords.longitude);
            } else {
                await checkPreference();
            }
        })();
    }, [navigation]);

    const checkPreference = async () => {
        const preferredCity = await AsyncStorage.getItem('preferredCity');
        if (preferredCity) {
            await fetchWeatherByCity(preferredCity);
        } else {
            setShowInput(true);
        }
        setLoading(false);
    };

    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            setLoading(true);
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            setWeather(res.data);
        } catch (error) {
            console.error('Error fetching weather:', error);
            alert('Error getting weather data');
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherByCity = async (cityName) => {
        try {
            setLoading(true);
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
            );
            setWeather(res.data);
            await AsyncStorage.setItem('preferredCity', cityName);
            setShowInput(false);
        } catch (e) {
            alert('Invalid city. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = (condition) => {
        if (!condition) return 'weather-sunny';
        condition = condition.toLowerCase();
        if (condition.includes('rain')) return 'opacity';
        if (condition.includes('cloud')) return 'cloud';
        if (condition.includes('sun')) return 'sunny';
        return 'sunny';
    };

    return (
        <View style={globalStyles.container}>
            {loading ? (
                <View style={{ 
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}>
                    <ActivityIndicator size="large" color='#4361EE' />
                </View>
            ) : showInput ? (
                <View style={[globalStyles.card, { marginTop: 20 }]}>
                    <Text style={globalStyles.title}>Enter Your City</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="City Name"
                        value={city}
                        onChangeText={setCity}
                    />
                    <TouchableOpacity
                        style={globalStyles.button}
                        onPress={() => fetchWeatherByCity(city)}
                    >
                        <Text style={globalStyles.buttonText}>Set Location</Text>
                    </TouchableOpacity>
                </View>
            ) : weather ? (
                <View style={[globalStyles.card, { marginTop: 20, alignItems: 'center' }]}>
                    <Icon 
                        name={getWeatherIcon(weather?.weather[0]?.main)} 
                        size={80} 
                        color='#7209B7'
                        style={{ marginBottom: 16 }}
                    />
                    <Text style={globalStyles.weatherCity}>{weather.name}, {weather.sys.country}</Text>
                    <Text style={{ 
                        fontSize: 18, 
                        color: '#212529', 
                        marginBottom: 16 
                    }}>
                        {weather.weather[0].description}
                    </Text>
                    <Text style={globalStyles.weatherTemp}>{Math.round(weather.main.temp)}°C</Text>
                    
                    <View style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        width: '100%', 
                        marginTop: 20 
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon name="thermostat" size={24} color='#4895EF' />
                            <Text style={{ color: '#212529' }}>Feels like</Text>
                            <Text style={{ fontWeight: 'bold' }}>{weather.main.feels_like}°C</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Icon name="opacity" size={24} color='#4895EF' />
                            <Text style={{ color: '#212529' }}>Humidity</Text>
                            <Text style={{ fontWeight: 'bold' }}>{weather.main.humidity}%</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Icon name="air" size={24} color='#4895EF' />
                            <Text style={{ color: '#212529' }}>Wind</Text>
                            <Text style={{ fontWeight: 'bold' }}>{weather.wind.speed} m/s</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[globalStyles.button, { marginTop: 20, flexDirection: 'row', alignItems: 'center' }]}
                        onPress={() => setShowInput(true)}
                    >
                        <Icon name="place" size={20} color="white" style={{ marginRight: 8 }} />
                        <Text style={globalStyles.buttonText}>Change Location</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#212529' }}>Unable to load weather data</Text>
                    <TouchableOpacity
                        style={[globalStyles.button, { marginTop: 20 }]}
                        onPress={() => setShowInput(true)}
                    >
                        <Text style={globalStyles.buttonText}>Enter City Manually</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default HomeScreen;