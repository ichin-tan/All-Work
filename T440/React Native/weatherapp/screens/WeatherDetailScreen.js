import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles as globalStyles, headerOptions } from '../global/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WeatherDetailScreen = ({ navigation, route }) => {
    const { weather } = route.params;

    useEffect(() => {
        navigation.setOptions({
            ...headerOptions,
            title: 'Weather Details',
            headerLeft: () => (
                <TouchableOpacity 
                    onPress={() => 
                        navigation.goBack()
                    } 
                    style={{ 
                        marginLeft: 0 
                    }}>
                    <Icon name="arrow-back" size={24} color='#F8F9FA' />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const getWeatherIcon = (condition) => {
        condition = condition.toLowerCase();
        if (condition.includes('rain'))
            return 'opacity';
        if (condition.includes('cloud'))
            return 'cloud';
        if (condition.includes('sun'))
            return 'sunny';
        return 'sunny';
    };

    return (
        <View style={globalStyles.container}>
            <View style={[globalStyles.card, { alignItems: 'center' }]}>
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
                    marginBottom: 16 }}>
                        {weather.weather[0].description}
                </Text>
                <Text style={globalStyles.weatherTemp}>{Math.round(weather.main.temp)}°C</Text>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 }}>
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
            </View>
        </View>
    );
};

export default WeatherDetailScreen;