import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles as globalStyles, headerOptions } from '../global/Theme';
import { AuthService } from '../helper/FirebaseHelper';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            ...headerOptions,
            title: 'Login',
        });
    }, [navigation]);

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
                await AuthService.login(email, password);
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
                <Text style={globalStyles.title}>Welcome Back</Text>
                
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

                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={globalStyles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ marginTop: 16 }}
                    onPress={() => navigation.navigate('SignupScreen')}
                >
                    <Text style={{ 
                        color: '#4361EE', 
                        textAlign: 'center' 
                    }}>
                        New here? <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;