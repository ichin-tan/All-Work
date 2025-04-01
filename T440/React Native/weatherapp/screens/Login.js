import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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

    const handleLogin = () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (isEmailValid && isPasswordValid) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    AsyncStorage.setItem('isLoggedIn', 'true'); // Set flag
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                })
                .catch(error => alert(error.message));
        }
    };

    return (
        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b' }} style={styles.background}>
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
                <Button title="Login" onPress={handleLogin} color="#FFD700" />
                <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 15,
        margin: 20
    },
    title: {
        fontSize: 34, color: '#FFF', textAlign: 'center', marginBottom: 20, fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#FFF', padding: 12, marginVertical: 10, borderRadius: 8
    },
    error: {
        color: '#FF4500', fontSize: 14, marginBottom: 10
    },
    link: {
        color: '#FFD700', textAlign: 'center', marginTop: 15, fontSize: 16
    },
});

export default Login;