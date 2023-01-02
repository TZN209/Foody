import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors } from '../global/styles';
import { Icon } from '@rneui/themed';
import { HomeScreen, MyAccountScreen, MyOrdersScreen } from '../screens';
import { ClientStack } from './clientStack';

const ClientTabs = createBottomTabNavigator();

export default function RootClientTabs() {
    return (
        <ClientTabs.Navigator
            screenOptions={{
                activeTintColor: colors.buttons,
            }}
        >
            <ClientTabs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ color, size }) => <Icon name="home" type="material" color={color} size={size} />,
                }}
            />

            <ClientTabs.Screen
                name="SearchScreen"
                component={ClientStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Tìm kiếm',
                    tabBarIcon: ({ color, size }) => <Icon name="search" type="material" color={color} size={size} />,
                }}
            />

            <ClientTabs.Screen
                name="MyOrdersScreen"
                component={MyOrdersScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Đơn hàng',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="view-list" type="material" color={color} size={size} />
                    ),
                }}
            />

            <ClientTabs.Screen
                name="MyAccount"
                component={MyAccountScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ color, size }) => <Icon name="person" type="material" color={color} size={size} />,
                }}
            />
        </ClientTabs.Navigator>
    );
}
