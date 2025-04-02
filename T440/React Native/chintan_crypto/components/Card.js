import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Card = ({ crypto, onPress }) => {
    const priceChangeColor = crypto.percent_change_24h >= 0 ? '#00B894' : '#D63031';

    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.symbol}>{crypto.symbol}</Text>
                <Text style={styles.name}>{crypto.name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.price}>${parseFloat(crypto.price_usd).toFixed(2)}</Text>
                <Text style={[styles.change, { color: priceChangeColor }]}>
                    {crypto.percent_change_24h}%
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#2D3436',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    symbol: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6C5CE7',
    },
    name: {
        fontSize: 16,
        color: '#2D3436',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3436',
    },
    change: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Card;