import { StyleSheet, View, Text } from "react-native"
import globalStyles from "../shared/GlobalStyles"

const InfoScreen = () => {

    return(
        <View style={[globalStyles.container, styles.infoContainer, {backgroundColor: 'maroon'}]}>
            <Text style={globalStyles.title}>Info Screen</Text>
        </View>
    )

}

export default InfoScreen

const styles = StyleSheet.create({
    infoContainer: {
      backgroundColor: 'blue',
      padding: 50,
    },
});