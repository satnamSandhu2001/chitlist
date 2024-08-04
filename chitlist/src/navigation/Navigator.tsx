import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../constants/screens';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import BootSplash from 'react-native-bootsplash';
import TabNavigator from './TabNavigator';
import { RootStackParamList } from '../constants/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
      <Stack.Navigator
        initialRouteName={SCREENS.Login}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.Login} component={Login} />
        <Stack.Screen name={SCREENS.Signup} component={Signup} />

        {/* protected routes */}
        <Stack.Screen name="Account" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
