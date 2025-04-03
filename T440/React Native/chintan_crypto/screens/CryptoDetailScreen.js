import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getCryptoDetails } from '../api/ApiHelper';
import { addFavorite } from '../firebase/FirebaseHelper';
import Loader from '../components/Loader';
import { Alert } from 'react-native';

const CryptoDetailScreen = ({ route, navigation }) => {
    const { cryptoId } = route.params;
    const [crypto, setCrypto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCryptoDetails = async () => {
            try {
                const data = await getCryptoDetails(cryptoId);
                setCrypto(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCryptoDetails();
        navigation.setOptions({
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

    }, []);

    const handleAddFavorite = async () => {
        try {
            const addedFavorite = await addFavorite(crypto);
            Alert.alert('Success', `${addedFavorite.name} added to favorites!`);
        } catch (error) {
            console.error('Error adding favorite:', error);
            Alert.alert('Error', 'Failed to add to favorites');
        }
    };

    if (loading || !crypto) {
        return <Loader />;
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.symbol}>{crypto.symbol}</Text>
                <Text style={styles.name}>{crypto.name}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Price (USD):</Text>
                <Text style={styles.value}>${parseFloat(crypto.price_usd).toFixed(2)}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>24h Change:</Text>
                <Text style={[styles.value, {
                    color: crypto.percent_change_24h >= 0 ? '#00B894' : '#D63031'
                }]}>
                    {crypto.percent_change_24h}%
                </Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Market Cap:</Text>
                <Text style={styles.value}>${parseFloat(crypto.market_cap_usd).toLocaleString()}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Volume (24h):</Text>
                <Text style={styles.value}>${parseFloat(crypto.volume24).toLocaleString()}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Circulating Supply:</Text>
                <Text style={styles.value}>{parseFloat(crypto.csupply).toLocaleString()} {crypto.symbol}</Text>
            </View>

            <TouchableOpacity onPress={handleAddFavorite} style={styles.favoriteButton}>
                <Text style={styles.favoriteButtonText}>FAVORITE</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
    },
    content: {
        padding: 20,
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    symbol: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#6C5CE7',
    },
    name: {
        fontSize: 24,
        color: '#2D3436',
        marginTop: 5,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DFE6E9',
    },
    label: {
        fontSize: 16,
        color: '#2D3436',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#2D3436',
    },
    favoriteButton: {
        backgroundColor: '#6C5CE7',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    favoriteButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CryptoDetailScreen;