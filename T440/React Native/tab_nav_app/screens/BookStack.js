// BookList.js

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import BookList from "./BookList";
import BookDetail from "./BookDetail";

const Stack = createNativeStackNavigator();

const BookStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="BookList"
                component={BookList}
            />
            <Stack.Screen
                name="BookDetail"
                component={BookDetail}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        fontSize: 28,
        fontWeight: "bold",
    },
});

export default BookStack;
