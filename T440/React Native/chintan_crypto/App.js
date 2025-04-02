import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import CryptoDetailScreen from './screens/CryptoDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6C5CE7',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false, // This removes the back button title
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Crypto Exchanges',
            headerRight: () => (
              <MaterialIcons 
                name="favorite" 
                size={24} 
                color="#FFFFFF" 
                style={{ marginRight: 0 }}
                onPress={() => navigation.navigate('Favorites')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="CryptoDetail"
          component={CryptoDetailScreen}
          options={({ route }) => ({
            title: route.params.cryptoId,
          })}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: 'My Favorites',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;