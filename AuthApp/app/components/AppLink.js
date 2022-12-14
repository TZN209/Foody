import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const AppLink = ({ text, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <Text style={styles.link}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    link: {
        color: '#8469cf',
        fontSize: 16,
    },
});

export default AppLink;
