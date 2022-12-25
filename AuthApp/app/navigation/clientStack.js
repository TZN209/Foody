import React, { useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProductScreen, RestaurantHomeScreen, SearchResultScreen, SearchScreen } from '../screens';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const ClientSearch = createNativeStackNavigator();

export function ClientStack({ navigation, route }) {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'RestaurantHomeScreen' || 'MenuProductScreen') {
            navigation.setOptions({ tabBarVisible: false });
        } else {
            navigation.setOptions({ tabBarVisible: true });
        }
    }, [navigation, route]);

    return (
        <ClientSearch.Navigator>
            <ClientSearch.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={() => ({
                    headerShown: false,
                })}
            />
            <ClientSearch.Screen
                name="SearchResultScreen"
                component={SearchResultScreen}
                options={() => ({
                    headerShown: false,
                })}
            />
            <ClientSearch.Screen
                name="RestaurantHomeScreen"
                component={RestaurantHomeScreen}
                options={() => ({
                    headerShown: false,
                })}
            />

            <ClientSearch.Screen
                name="MenuProductScreen"
                component={MenuProductScreen}
                options={() => ({
                    headerShown: false,
                })}
            />
        </ClientSearch.Navigator>
    );
}
