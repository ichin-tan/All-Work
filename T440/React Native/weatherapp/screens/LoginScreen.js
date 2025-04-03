import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Config';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

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

    const handleLogin = async () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (isEmailValid && isPasswordValid) {
            setLoading(true);
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = {
                        uid: user.uid,
                        ...userDoc.data()
                    };
                    await AsyncStorage.setItem('user', JSON.stringify(userData));
                    
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                }
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
                <Text style={styles.title}>Welcome Back</Text>
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
                <TouchableOpacity                    
                    style={styles.buttonStyle}
                    onPress={handleLogin} 
                >
                    <Text style={styles.buttonText}>{loading ? "Signing In..." : "Login"}</Text>
                </TouchableOpacity>
                <Text style={styles.link} onPress={() => navigation.navigate('SignupScreen')}>
                    New here? Sign Up
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
        fontSize: 34, color: '#FFF', 
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
        color: '#FF4500', fontSize: 14, marginBottom: 10
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
    link: {
        color: '#2BD9FE', 
        textAlign: 'center', 
        marginTop: 15, 
        fontSize: 16
    },
});

export default LoginScreen;