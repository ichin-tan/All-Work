import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator } from 'react-native';
import { auth } from './config/Config';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import WeatherDetailScreen from './screens/WeatherDetailScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { headerOptions, tabBarOptions } from './global/Theme';

const NativeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Favorites') iconName = 'favorite';
        else if (route.name === 'Profile') iconName = 'person';
        return <Icon name={iconName} size={size} color={color} />;
      },
      ...tabBarOptions,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ ...headerOptions, title: 'Weather', headerLeft: null }} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ ...headerOptions, title: 'Favorites', headerLeft: null }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ ...headerOptions, title: 'Profile', headerLeft: null }} />
  </Tab.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color='#4361EE' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <NativeStack.Navigator screenOptions={headerOptions}>
          <NativeStack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
          <NativeStack.Screen name="WeatherDetailScreen" component={WeatherDetailScreen} options={{ ...headerOptions, title: 'Weather Details' }} />
          <NativeStack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ ...headerOptions, title: 'Edit Profile' }} />
        </NativeStack.Navigator>
      ) : (
        <NativeStack.Navigator initialRouteName="LoginScreen" screenOptions={headerOptions}>
          <NativeStack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login', headerLeft: null }} />
          <NativeStack.Screen name="SignupScreen" component={SignupScreen} options={{ title: 'Create Account', headerLeft: null }} />
        </NativeStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;