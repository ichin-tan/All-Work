import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../stack_screens/Login';
import Dashboard from '../stack_screens/Dashboard';
import Booking from '../stack_screens/Booking';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    const headerOptions = () => ({
        headerStyle: {
            backgroundColor: "#1D1E2C",
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
        },
    });

    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Group screenOptions={headerOptions}>
                <Stack.Screen
                    component={Login}
                    name="Login"
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={({ navigation }) => ({
                        title: 'Dashboard',
                        headerBackVisible: false,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.popTo('Login')}
                            >
                                <MaterialIcons name="logout" size={30} color="white" />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Booking"
                    component={Booking}
                    options={({ navigation }) => ({
                        title: 'Booking Details',
                        headerBackVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ marginLeft: -10 }}
                            >
                                <MaterialIcons name="chevron-left" size={30} color="white" />
                            </TouchableOpacity>
                        ),
                    })}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default StackNavigation;
