import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../Config';

const Profile = () => {
    const user = auth.currentUser;

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                AsyncStorage.setItem('isLoggedIn', 'false'); // Clear flag
            })
            .catch(error => console.log('Logout error:', error));
    };

    return (
        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b' }} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Your Profile</Text>
                <Text style={styles.info}>Name: {user.displayName || 'Guest'}</Text>
                <Text style={styles.info}>Email: {user.email}</Text>
                <Button title="Logout" onPress={handleLogout} color="#FF4500" />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, justifyContent: 'center' },
    container: { padding: 20, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 15, margin: 20 },
    title: { fontSize: 28, color: '#FFD700', textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
    info: { fontSize: 18, color: '#FFF', marginVertical: 10, textAlign: 'center' },
});

export default Profile;