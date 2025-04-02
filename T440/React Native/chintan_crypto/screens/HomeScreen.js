import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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

    const navigateToDetail = (crypto) => {
        navigation.navigate('CryptoDetail', { cryptoId: crypto.id });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
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
    listContent: {
        paddingBottom: 20,
        paddingTop: 10,
    },
});

export default HomeScreen;