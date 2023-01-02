import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootClientTabs from './ClientTabs';

import { Icon } from '@rneui/themed';
import { colors } from '../global/styles';
import DrawerContent from '../components/DrawerContent';
import { BusinessConsoleScreen } from '../screens';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen
                name="RootClientTabs"
                component={RootClientTabs}
                options={{
                    headerShown: false,
                    title: 'Trang chủ',
                    drawerIcon: ({ focussed, size }) => (
                        <Icon
                            type="material-community"
                            name="home"
                            color={focussed ? '#7cc' : colors.grey2}
                            size={size}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Business Console"
                component={BusinessConsoleScreen}
                options={{
                    title: 'Quản lý nhà hàng',
                    drawerIcon: ({ focussed, size }) => (
                        <Icon type="material" name="business" color={focussed ? '#7cc' : colors.grey2} size={size} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
