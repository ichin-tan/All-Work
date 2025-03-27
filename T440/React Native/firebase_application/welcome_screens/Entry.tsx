import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const Entry: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Signin")
                }}
                style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Signup")
                }}

                style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        borderRadius: 10,
        height: 40,
        backgroundColor: 'chocolate',
    },

    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700'
    }


});

export default Entry;