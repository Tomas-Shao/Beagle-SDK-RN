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
import HomePage from './src/pages/HomePage';
import DetailPage from './src/pages/DetailPage';
import {CounterPage} from './src/pages/CounterPage';
import WalletConnectPage from './src/pages/WalletConnectPage';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomePage}></Stack.Screen>
                <Stack.Screen name="Detail" component={DetailPage}></Stack.Screen>
                <Stack.Screen name="Counter" component={CounterPage}></Stack.Screen>
                {/*<Stack.Screen name="Wallet" component={WalletConnectPage}></Stack.Screen>*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
