import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

export default function BusinessConsoleScreen() {
    return (
        <View style={styles.container}>
            <Text>Xin chào</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
