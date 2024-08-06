import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PickupPointScreen from '../screens/selectpickup';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
        />
        <HomeStack.Screen
            name="pickupoint"
            component={PickupPointScreen}
            options={{ headerShown: false }}
        />
    </HomeStack.Navigator>
);

export default HomeStackScreen;
