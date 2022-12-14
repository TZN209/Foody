import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';

const FormContainer = ({ children }) => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <Image style={styles.logo} source={{ uri: 'https://www.reactnative.express/static/logo.png' }} />
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
//24
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 125,
        height: 125,
        marginBottom: 20,
        marginTop: height * 0.1,
        alignSelf: 'center',
    },
});

export default FormContainer;
