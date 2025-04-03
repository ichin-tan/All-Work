import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles as globalStyles, headerOptions } from '../global/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            ...headerOptions,
            title: 'Create Account',
            headerLeft: () => (
                <TouchableOpacity 
                    onPress={() => 
                        navigation.goBack()
                    } 
                    style={{ 
                        marginLeft: 0 
                    }}>
                    <Icon name="arrow-back" size={24} color={'#F8F9FA'} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

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
                    routes: [{ name: 'HomeTabs' }],
                });
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={globalStyles.container}>
            <View style={[globalStyles.card, { marginTop: 20 }]}>
                <Text style={globalStyles.title}>Create Account</Text>

                <TextInput
                    style={globalStyles.input}
                    placeholder="Full Name"
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        validateName(text);
                    }}
                />
                {nameError ? <Text style={globalStyles.errorText}>{nameError}</Text> : null}

                <TextInput
                    style={globalStyles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        validateEmail(text);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {emailError ? <Text style={globalStyles.errorText}>{emailError}</Text> : null}

                <TextInput
                    style={globalStyles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        validatePassword(text);
                    }}
                    secureTextEntry
                />
                {passwordError ? <Text style={globalStyles.errorText}>{passwordError}</Text> : null}

                <TextInput
                    style={globalStyles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        validateConfirmPassword(text);
                    }}
                    secureTextEntry
                />
                {confirmPasswordError ? <Text style={globalStyles.errorText}>{confirmPasswordError}</Text> : null}

                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={handleSignup}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={globalStyles.buttonText}>Sign Up</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 16 }}
                    onPress={() => 
                        navigation.goBack()
                    }
                >
                    <Text style={{ 
                        color: '#4361EE', 
                        textAlign: 'center'
                    }}>
                        Already have an account? <Text style={{ fontWeight: 'bold' }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignupScreen;