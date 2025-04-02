import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color='#6C5CE7' />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F6FA'
    },
});

export default Loader;