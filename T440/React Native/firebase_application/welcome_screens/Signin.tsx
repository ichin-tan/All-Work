import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../config/FirebaseConfig';

export default function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = async () => {
        try {
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
                .then((result) => {
                    console.log(result.user.email);
                })
        } catch (err) {
            console.log("Something went wrong")
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, styles.firstInput]}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                    handleSignin()
                }}
            >
                <Text style={styles.buttonTextStyle}> Sign In </Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    firstInput: {
        marginTop: 20
    },
    input: {
        borderColor: 'chocolate',
        color: '#1D1E2C',
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        fontSize: 18,
        fontWeight: 'semibold',
        height: 50,
        backgroundColor: "#FFFFFF",
        width: '90%'
    },
    buttonStyle: {
        width: '90%',
        borderRadius: 10,
        fontSize: 20,
        backgroundColor: 'chocolate',
        marginTop: 5,
        height: 50,
        alignItems: 'center'
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 12.5
    },
});
