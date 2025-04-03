import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WeatherApi, getWeatherIcon } from '../helper/WeatherHelper';
import { styles as globalStyles, headerOptions } from '../global/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            ...headerOptions,
            title: 'Weather',
        });
        
        loadWeatherData();
    }, [navigation]);

    const loadWeatherData = async () => {
        try {
            setLoading(true);
            const weatherData = await WeatherApi.getCurrentLocationWeather();
            if (!weatherData) {
                const preferredWeather = await WeatherApi.getPreferredCityWeather();
                if (!preferredWeather) {
                    setShowInput(true);
                } else {
                    setWeather(preferredWeather);
                }
            } else {
                setWeather(weatherData);
            }
        } catch (error) {
            alert("'Error loading weather data!")
            setShowInput(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCitySubmit = async () => {
        if(city === "") {
            alert("Please enter city")
            return
        }
        try {
            setLoading(true);
            const weatherData = await WeatherApi.getWeatherByCity(city);
            setWeather(weatherData);
            setShowInput(false);
        } catch (error) {
            alert('Invalid city. Try again.');
        } finally {
            setLoading(false);
        }
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
                        onPress={handleCitySubmit}
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