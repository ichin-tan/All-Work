import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if ((username === "Admin" || username === "admin") && (password === "Admin" || password === "admin")) {
      setUsername("")
      setPassword("")
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to the App</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="gray"
        value={username}
        onChangeText={setUsername}
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
          handleLogin()
        }}
      >
        <Text style={styles.buttonTextStyle}> Login </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: "#BBDEF0",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#1D1E2C',
    color: '#1D1E2C',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    fontSize: 18,
    fontWeight: 'semibold',
    height: 50,
    backgroundColor: "#FFFFFF"
  },
  buttonStyle: {
    width: '100%',
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#1D1E2C',
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
  title: {
    fontSize: 25,
    color: '1D1E2C',
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
});

export default Login;