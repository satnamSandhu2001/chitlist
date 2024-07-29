import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../constants/screens';
import { Profile } from '../screens/Profile';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { UserContext } from '../context/UserContext';
import BootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { isAuth } = React.useContext(UserContext);

  return (
    <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
      <Stack.Navigator
        initialRouteName={SCREENS.Login}
        screenOptions={{ headerShown: false }}>
        {!isAuth ? (
          <>
            <Stack.Screen name={SCREENS.Login} component={Login} />
            <Stack.Screen name={SCREENS.Signup} component={Signup} />
          </>
        ) : (
          <>
            <Stack.Screen name={SCREENS.Profile} component={Profile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
