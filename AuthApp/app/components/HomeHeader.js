import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Icon, withBadge } from '@rneui/themed';
import { colors, parameters } from '../global/styles';

export default function HomeHeader({ navigation }) {
    const BadgeIcon = withBadge(2)(Icon);

    return (
        <View style={styles.header}>
            {/* Menu Icon */}
            <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                <Icon
                    type="material-community"
                    name="menu"
                    color={colors.cardbackground}
                    size={32}
                    //13 2x
                    onPress={() => {
                        navigation.toggleDrawer();
                    }}
                />
            </View>

            {/* Title */}
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.cardbackground, fontSize: 25, fontWeight: 'bold' }}> Fast Food </Text>
            </View>

            {/* Cart */}
            <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
                <BadgeIcon type="material-community" name="cart" size={32} color={colors.cardbackground} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: colors.buttons,
        height: parameters.headerHeight,
        justifyContent: 'space-between',
    },
});
