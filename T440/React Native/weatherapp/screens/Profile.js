import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Button, 
  StyleSheet, 
  ImageBackground, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        const parsedData = JSON.parse(userJson);
        setUserData(parsedData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchUserData();

    // Subscribe to focus events
    const unsubscribe = navigation.addListener('focus', fetchUserData);

    // Cleanup the subscription
    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b' }} 
        style={styles.background}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Your Profile</Text>
        
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.info}>{userData?.name || 'Guest'}</Text>
          
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{userData?.email}</Text>
        </View>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile', { userData })}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <Button 
          title="Logout" 
          onPress={handleLogout} 
          color="#FF4500" 
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  container: { 
    padding: 20, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    borderRadius: 15, 
    margin: 20 
  },
  title: { 
    fontSize: 28, 
    color: '#FFD700', 
    textAlign: 'center', 
    marginBottom: 20, 
    fontWeight: 'bold' 
  },
  profileInfo: {
    marginBottom: 20,
  },
  label: {
    color: '#FFD700',
    fontSize: 16,
    marginTop: 10,
  },
  info: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 8,
    marginVertical: 15,
    alignItems: 'center'
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default Profile;