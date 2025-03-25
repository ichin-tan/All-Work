import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import InfoScreen from './Screens/infoScreen';
import globalStyles from './shared/GlobalStyles';

export default function App() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Hii I am</Text>
      <Text>Chintan</Text>

      <InfoScreen />
      <InfoScreen />
      <InfoScreen />
      <InfoScreen />

      <StatusBar style="auto" />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'green',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   title: {
//     fontSize: 50,
//     color: 'red',
//     fontFamily: 'courier',
//   }
// });
