import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
        if (route.name === 'Home') {
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
        borderTopWidth: 0
      },
    })}
  >
    <Tab.Screen
      name="Home"
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

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user));
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <NativeStack.Navigator>
        {user ? (
          <>
            <NativeStack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
            <NativeStack.Screen
              name="WeatherDetails"
              component={WeatherDetail}
              options={{ headerStyle: { backgroundColor: '#1E90FF' }, headerTintColor: '#FFF' }}
            />
          </>
        ) : (
          <>
            <NativeStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <NativeStack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          </>
        )}
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

export default App;