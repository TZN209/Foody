import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppLink from './AppLink';

const FormNavigator = ({ leftLinkText, rightLinkText, onLeftLinkPress, onRightLinkPress }) => {
    return (
        <View style={styles.linkContainer}>
            <AppLink onPress={onLeftLinkPress} text={leftLinkText} />
            <AppLink onPress={onRightLinkPress} text={rightLinkText} />
        </View>
    );
};
//24
const styles = StyleSheet.create({
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
});

export default FormNavigator;
