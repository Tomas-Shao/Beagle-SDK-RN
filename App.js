/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './pages/HomePage';
import DetailsScreen from './pages/DetailPage';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomePage}></Stack.Screen>
                <Stack.Screen name="Detail" component={DetailsScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
