import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, Login, RestaurantMapScreen } from '../screens';
import { Signup } from '../screens';
import { ForgetPassword } from '../screens';
import { Verification } from '../screens';
import DrawerNavigator from './DrawerNavigator';
import RootClientTabs from './ClientTabs';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="RootClientTabs" component={RootClientTabs} />
            <Stack.Screen name="Home" component={DrawerNavigator} />
            <Stack.Screen name="RestaurantMapScreen" component={RestaurantMapScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
