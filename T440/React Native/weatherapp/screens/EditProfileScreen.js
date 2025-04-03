import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, headerOptions } from '../global/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditProfileScreen = ({ navigation, route }) => {
    const { userData } = route.params;
    const [name, setName] = useState(userData?.name || '');
    const [loading, setLoading] = useState(false);
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        navigation.setOptions({
            ...headerOptions,
            title: 'Edit Profile',
            headerLeft: () => (
                <TouchableOpacity onPress={() => 
                    navigation.goBack()
                } 
                style={{ 
                    marginLeft: 0 
                }}>
                    <Icon name="arrow-back" size={24} color={'#F8F9FA'} />
                </TouchableOpacity>
            ),
        });
        setName(userData?.name || '');
    }, [userData, navigation]);

    const validateName = (name) => {
        if (!name) {
            setNameError('Name is required');
            return false;
        } else if (name.length < 2) {
            setNameError('Name must be at least 2 characters');
            return false;
        }
        setNameError('');
        return true;
    };

    const handleUpdateProfile = async () => {
        if (!validateName(name)) return;

        setLoading(true);
        try {
            await updateDoc(doc(db, 'users', userData.uid), {
                name: name
            });
            const updatedUser = {
                ...userData,
                name: name
            };
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            navigation.goBack();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.card, { marginTop: 20 }]}>
                <Text style={styles.title}>Edit Your Profile</Text>
                
                <Text style={{ color: '#212529', marginBottom: 4 }}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        validateName(text);
                    }}
                    placeholder="Enter your name"
                />
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
                
                <Text style={{ 
                    color: '#212529', 
                    marginBottom: 4 
                }}>
                    Email
                </Text>
                <TextInput
                    style={[styles.input, { backgroundColor: '#f0f0f0' }]}
                    value={userData?.email}
                    editable={false}
                />
                
                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleUpdateProfile}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonText}>Save Changes</Text>
                    )}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: '#F72585' }]}
                    onPress={() => navigation.goBack()}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditProfileScreen;