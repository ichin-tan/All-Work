import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { getExchanges } from '../api/ApiHelper';

const HomeScreen = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const data = await getExchanges();
                setExchanges(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchExchanges();
    }, []);

    const navigateToFavorites = () => {
        navigation.navigate('Favorites');
    };

    const navigateToDetail = (crypto) => {
        navigation.navigate('CryptoDetail', { cryptoId: crypto.id });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Crypto Exchanges</Text>
                <TouchableOpacity onPress={navigateToFavorites} style={styles.favoritesButton}>
                    <Text style={styles.favoritesButtonText}>MY EXCHANGE</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={exchanges}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card crypto={item} onPress={() => navigateToDetail(item)} />
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#6C5CE7',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    favoritesButton: {
        backgroundColor: '#FD79A8',
        padding: 10,
        borderRadius: 5,
    },
    favoritesButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default HomeScreen;