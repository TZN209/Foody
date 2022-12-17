import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens';
import { Signup } from '../screens';
import { ForgetPassword } from '../screens';
import { Verification } from '../screens';
import { Home } from '../screens';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
