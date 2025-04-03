import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Favorites') {
          iconName = 'favorite';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      ...tabBarOptions,
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        ...headerOptions,
        title: 'Weather',
        headerLeft: null
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        ...headerOptions,
        title: 'Favorites',
        headerLeft: null
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        ...headerOptions,
        title: 'Profile',
        headerLeft: null
      }}
    />
  </Tab.Navigator>
);

const MainStack = () => (
  <NativeStack.Navigator screenOptions={headerOptions}>
    <NativeStack.Screen
      name="HomeTabs"
      component={HomeTabs}
      options={{ headerShown: false }}
    />
    <NativeStack.Screen
      name="WeatherDetailScreen"
      component={WeatherDetailScreen}
      options={({ navigation }) => ({
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
      })}
    />
    <NativeStack.Screen
      name="EditProfileScreen"
      component={EditProfileScreen}
      options={({ navigation }) => ({
        ...headerOptions,
        title: 'Edit Profile',
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
      })}
    />
  </NativeStack.Navigator>
);

const AuthStack = () => (
  <NativeStack.Navigator screenOptions={headerOptions}>
    <NativeStack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
        title: 'Login',
        headerLeft: null
      }}
    />
    <NativeStack.Screen
      name="SignupScreen"
      component={SignupScreen}
      options={({ navigation }) => ({
        title: 'Create Account',
        headerLeft: null
      })}
    />
  </NativeStack.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user');
        const loggedIn = userJson !== null;
        console.log('Initial auth status from AsyncStorage:', loggedIn);
        setIsLoggedIn(loggedIn);

        const unsubscribe = auth.onAuthStateChanged(user => {
          console.log('onAuthStateChanged user:', user ? user.email : 'null');
          if (user) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            AsyncStorage.removeItem('user');
          }
        });
        return () => unsubscribe();
      } catch (error) {
        console.log('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color='#4361EE' />
      </View>
    );
  }

  console.log('Rendering with isLoggedIn:', isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA'
  },
});

export default App;