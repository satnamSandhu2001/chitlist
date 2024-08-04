import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: { redirect?: string } | undefined;
  Signup: undefined;
  Account: NavigatorScreenParams<BottomTabsParamList>;
};

export type BottomTabsParamList = {
  Todo: undefined;
  Profile: undefined;
};

export type CombinedNavigationParamList = RootStackParamList &
  BottomTabsParamList;

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList> &
  BottomTabNavigationProp<BottomTabsParamList>;
