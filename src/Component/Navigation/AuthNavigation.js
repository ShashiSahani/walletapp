import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home/Home';
import Login from '../Screens/Authentication/Login/Login';
import Register from '../Screens/Authentication/Signup/Register';
import Otp from '../Screens/Authentication/Otp/Otp';
import ForgotPassword from '../Screens/ForgotPassword/ForgotPassword';
import Register_otp from '../Screens/Authentication/Signup/Register_otp';

const AuthNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="MainScren" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Otp" component={Otp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="Register_otp" component={Register_otp} />



            </Stack.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({})

export default AuthNavigation;
