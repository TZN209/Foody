import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import ForgetPassword from './app/screens/ForgetPassword';
import Login from './app/screens/Login';
import Signup from './app/screens/Signup';
import Verification from './app/screens/Verification';
import AuthNavigator from './app/navigation/AuthNavigator';

const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: '#fff' },
};
const App = () => {
    return (
        <NavigationContainer theme={theme}>
            <AuthNavigator />
        </NavigationContainer>
    );
};

export default App;
