import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config';

const Signup = ({ navigation }) => {
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

    const handleSignup = async () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (isEmailValid && isPasswordValid) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    favorites: [],
                });
                navigation.navigate('Home');
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b' }} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Get Started</Text>
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
                <Button title="Sign Up" onPress={handleSignup} color="#FFD700" />
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
        backgroundColor: 'rgba(0,0,0,0.6)', 
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
        borderRadius: 8 
    },
    error: { 
        color: '#FF4500', 
        fontSize: 14, 
        marginBottom: 10 
    },
    link: { 
        color: '#FFD700', 
        textAlign: 'center', 
        marginTop: 15, 
        fontSize: 16 
    },
});

export default Signup;