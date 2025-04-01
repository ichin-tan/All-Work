import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './Config';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Favorites from './screens/Favorites';
import Profile from './screens/Profile';
import WeatherDetail from './screens/WeatherDetail';
import { MaterialIcons } from '@expo/vector-icons';

const NativeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'HomeTab') {
          iconName = 'home';
        } else if (route.name === 'Favorites') {
          iconName = 'favorite';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        }
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FFD700',
      tabBarInactiveTintColor: '#FFF',
      tabBarStyle: {
        backgroundColor: '#1E90FF',
        paddingBottom: 5,
        height: 60,
        borderTopWidth: 0,
      },
    })}
  >
    <Tab.Screen
      name="HomeTab"
      component={Home}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Favorites"
      component={Favorites}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const AuthStack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <NativeStack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
  </NativeStack.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        console.log('Initial isLoggedIn from AsyncStorage:', loggedIn);
        setIsLoggedIn(loggedIn === 'true');

        const unsubscribe = auth.onAuthStateChanged(user => {
          console.log('onAuthStateChanged user:', user ? user.email : 'null');
          if (user) {
            setIsLoggedIn(true);
            AsyncStorage.setItem('isLoggedIn', 'true');
          } else {
            setIsLoggedIn(false);
            AsyncStorage.setItem('isLoggedIn', 'false');
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
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  console.log('Rendering with isLoggedIn:', isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <NativeStack.Navigator>
          <NativeStack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
          <NativeStack.Screen
            name="WeatherDetails"
            component={WeatherDetail}
            options={{ headerStyle: { backgroundColor: '#1E90FF' }, headerTintColor: '#FFF' }}
          />
        </NativeStack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E90FF' },
  loadingText: { fontSize: 24, color: '#FFF', fontWeight: 'bold' },
});

export default App;