import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation, route }) => {
    const { userData } = route.params;
    const [name, setName] = useState(userData?.name || '');
    const [loading, setLoading] = useState(false);
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        setName(userData?.name || '');
    }, [userData]);

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
            // Update in Firestore
            await updateDoc(doc(db, 'users', userData.uid), {
                name: name
            });

            // Update in AsyncStorage
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
        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b' }} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
                
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        validateName(text);
                    }}
                    placeholder="Enter your name"
                />
                {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
                
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={userData?.email}
                    editable={false}
                />
                
                <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={handleUpdateProfile}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                    disabled={loading}
                >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
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
    label: {
        color: '#FFF',
        marginBottom: 5,
        fontSize: 16
    },
    input: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16
    },
    disabledInput: {
        backgroundColor: '#DDD',
        color: '#666'
    },
    error: {
        color: '#FF4500',
        fontSize: 14,
        marginBottom: 15
    },
    saveButton: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center'
    },
    saveButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },
    cancelButton: {
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFD700'
    },
    cancelButtonText: {
        color: '#FFD700',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default EditProfile;