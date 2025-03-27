import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Entry from "../welcome_screens/Entry";
import Signin from "../welcome_screens/Signin";
import Signup from "../welcome_screens/Signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

export default function WelcomeStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Entry"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'chocolate'
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: '700'
                    }
                }} >
                <Stack.Screen
                    component={Entry}
                    name='Entry' />
                <Stack.Screen
                    component={Signin}
                    name='Signin' />
                <Stack.Screen
                    component={Signup}
                    name='Signup' />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
