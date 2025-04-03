import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles as globalStyles, headerOptions } from '../global/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CommonActions } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      ...headerOptions,
      title: 'Profile',
    });
    
    const unsubscribe = navigation.addListener('focus', fetchUserData);
    fetchUserData();
    return unsubscribe;
  }, [navigation]);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      );
    } catch (error) {
      console.log('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color='#4361EE' />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.card, { marginTop: 20 }]}>
        <Text style={[globalStyles.title, { marginLeft: 0 }]}>
          {userData?.name || 'NA'}
        </Text>

        <View style={{ marginBottom: 20 }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 8 
          }}>
            <Icon name="email" size={20} color='#212529' style={{ marginRight: 8 }} />
            <Text style={{ color: '#212529' }}>Email:</Text>
            <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>{userData?.email}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[globalStyles.button, { flexDirection: 'row', justifyContent: 'center' }]}
          onPress={() => 
            navigation.navigate('EditProfileScreen', { userData })}
        >
          <Icon name="edit" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={globalStyles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: '#F72585', flexDirection: 'row', justifyContent: 'center' }]}
          onPress={handleLogout}
        >
          <Icon name="logout" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={globalStyles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;