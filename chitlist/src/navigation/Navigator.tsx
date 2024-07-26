import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../constants/screens';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREENS.Login}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={SCREENS.Login}
          component={Login}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name={SCREENS.Signup} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
