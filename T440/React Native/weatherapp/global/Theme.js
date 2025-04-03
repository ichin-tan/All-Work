import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        margin: 8,
        shadowColor: '#212529',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#F8F9FA',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 8,
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#4361EE',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4361EE',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: '#F72585',
        fontSize: 14,
        marginBottom: 8,
    },
    weatherTemp: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#212529',
        textAlign: 'center',
    },
    weatherCity: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212529',
        textAlign: 'center',
    },
});

export const headerOptions = {
    headerStyle: {
        backgroundColor: '#4361EE',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    headerTintColor: '#F8F9FA',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    headerBackTitleVisible: false,
};

export const tabBarOptions = {
    activeTintColor: '#4361EE',
    inactiveTintColor: '#212529',
    style: {
        backgroundColor: '#F8F9FA',
        borderTopWidth: 0,
        elevation: 8,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: -2 },
    },
    labelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
};