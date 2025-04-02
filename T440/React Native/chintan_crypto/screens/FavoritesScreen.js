import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FavCard from '../components/FavCard';
import { getFavorites, clearFavorites, removeFavorite } from '../firebase/FirebaseHelper';
import Loader from '../components/Loader';

const FavoritesScreen = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavorites();
                console.log(data);
                
                setFavorites(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = navigation.addListener('focus', fetchFavorites);
        return unsubscribe;
    }, [navigation]);

    const handleClearFavorites = () => {
        Alert.alert(
            'Clear Favorites',
            'Are you sure you want to remove all favorites?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await clearFavorites();
                            setFavorites([]);
                        } catch (error) {
                            console.error('Error clearing favorites:', error);
                        }
                    },
                },
            ]
        );
    };

    const handleRemoveFavorite = async (crypto) => {
        console.log(crypto);
        
        try {
            setLoading(true);
            await removeFavorite(crypto.docId);
            setFavorites(prev => prev.filter(fav => fav.id !== crypto.id));
        } catch (error) {
            console.error('Error removing favorite:', error);
            Alert.alert('Error', 'Failed to remove favorite');
        } finally {
            setLoading(false);
        }
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
                <Text style={styles.title}>My Favorites</Text>
                <TouchableOpacity
                    onPress={handleClearFavorites}
                    style={[styles.clearButton, favorites.length === 0 && styles.disabledButton]}
                    disabled={favorites.length === 0}
                >
                    <Text style={styles.clearButtonText}>CLEAR FAVORITES</Text>
                </TouchableOpacity>
            </View>

            {favorites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No currency found</Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <FavCard
                            crypto={item}
                            onPress={() => navigateToDetail(item)}
                            onRemove={() => handleRemoveFavorite(item)}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                />
            )}
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
    clearButton: {
        backgroundColor: '#D63031',
        padding: 10,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#DFE6E9',
    },
    clearButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#2D3436',
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default FavoritesScreen;