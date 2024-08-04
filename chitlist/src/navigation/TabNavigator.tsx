/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCREENS } from '../constants/screens';
import { Profile } from '../screens/Account/Profile';
import Icons from '../components/Icons';
import { COLORS } from '../constants/colors';
import Todo from '../screens/Account/Todo';
import { View } from 'react-native';
import { UserContext } from '../context/UserContext';
import { AppNavigationProp, BottomTabsParamList } from '../constants/types';
import { useNavigation, useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export default function TabNavigator() {
  const { isAuth } = React.useContext(UserContext);
  const navigation = useNavigation<AppNavigationProp>();
  const router = useRoute<any>();

  React.useEffect(() => {
    if (!isAuth) {
      navigation.navigate(SCREENS.Login, { redirect: router.params?.screen });
    }
  }, [isAuth, navigation, router]);

  if (!isAuth) {
    return null;
  }

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.Todo}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          paddingHorizontal: 5,
          paddingTop: 12,
          backgroundColor: '#e3f5f7',
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused, size }) => {
          let iconName = 'home';
          if (route.name === SCREENS.Profile) {
            iconName = 'person';
          } else if (route.name === SCREENS.Todo) {
            iconName = 'home';
          }
          return (
            <View
              style={{
                paddingHorizontal: 5,
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 8,
              }}>
              <Icons
                name={iconName + (!focused ? '-outline' : '')}
                size={size}
                color={COLORS['primary-100']}
              />
              <View
                style={{
                  width: 50,
                  height: 5,
                  backgroundColor: focused
                    ? COLORS['primary-100']
                    : 'transparent',
                  borderTopRightRadius: 100,
                  borderTopLeftRadius: 100,
                }}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen name={SCREENS.Todo} component={Todo} />
      <Tab.Screen name={SCREENS.Profile} component={Profile} />
    </Tab.Navigator>
  );
}
