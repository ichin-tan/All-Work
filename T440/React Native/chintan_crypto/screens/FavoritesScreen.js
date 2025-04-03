import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FavCard from '../components/FavCard';
import { getFavorites, clearFavorites, removeFavorite } from '../firebase/FirebaseHelper';
import Loader from '../components/Loader';

const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

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
                            setLoading(true);
                            await clearFavorites();
                            setFavorites([]);
                        } catch (error) {
                            console.error('Error clearing favorites:', error);
                            Alert.alert('Error', 'Failed to clear favorites');
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavorites();
                setFavorites(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        navigation.setOptions({
            headerRight: () => (
                <MaterialIcons
                    name="delete-sweep"
                    size={24}
                    color={favorites.length === 0 ? '#DFE6E9' : '#FFFFFF'}
                    style={{ marginRight: 0 }}
                    onPress={handleClearFavorites}
                    disabled={favorites.length === 0}
                />
            ),
            headerLeft: () => (
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="#FFFFFF"
                    style={{ marginLeft: 0 }}
                    onPress={() => navigation.goBack()}
                />
            ),

        });

        return navigation.addListener('focus', fetchFavorites);
    }, [favorites.length]);

    const handleRemoveFavorite = async (crypto) => {
        try {
            setLoading(true);
            await removeFavorite(crypto.docId);
            setFavorites(prev => prev.filter(fav => fav.docId !== crypto.docId));
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
            {favorites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No currency found</Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.docId}
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
        paddingTop: 10,
    },
});

export default FavoritesScreen;