import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

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

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError('Password is required');
            return false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validateConfirmPassword = (confirmPassword) => {
        if (!confirmPassword) {
            setConfirmPasswordError('Please confirm your password');
            return false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };

    const handleSignup = async () => {
        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            setLoading(true);
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                const userData = {
                    uid: user.uid,
                    name: name,
                    email: user.email,
                    favorites: [],
                };

                await setDoc(doc(db, 'users', user.uid), userData);
                await AsyncStorage.setItem('user', JSON.stringify(userData));
                
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <ImageBackground source={require('../assets/default.png')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Get Started</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        validateName(text);
                    }}
                />
                {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        validateEmail(text);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
                
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        validatePassword(text);
                    }}
                    secureTextEntry
                />
                {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
                
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        validateConfirmPassword(text);
                    }}
                    secureTextEntry
                />
                {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}
                
                <TouchableOpacity                    
                    style={styles.buttonStyle}
                    onPress={handleSignup} 
                >
                    <Text style={styles.buttonText}>{loading ? "Creating Account..." : "Sign Up"}</Text>
                </TouchableOpacity>

                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                    Already have an account? Login
                </Text>
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
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 15,
        margin: 20
    },
    title: {
        fontSize: 34,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 12,
        marginVertical: 10,
        borderRadius: 10
    },
    error: {
        color: '#FF4500',
        fontSize: 14,
        marginBottom: 10
    },
    link: {
        color: '#2BD9FE',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 16
    },
    buttonStyle: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 8,
        marginVertical: 15,
        alignItems: 'center'
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },    
});

export default Signup;