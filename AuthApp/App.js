import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import ForgetPassword from './app/components/screens/ForgetPassword';
import Login from './app/components/screens/Login';
import Signup from './app/components/screens/Signup';
import Verification from './app/components/screens/Verification';
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
