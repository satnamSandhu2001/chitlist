import { Link } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { SCREENS } from '../../constants/screens';
import { UserContext } from '../../context/UserContext';

export const Profile = () => {
  const { logout } = useContext(UserContext);
  return (
    <View>
      <Text>My Profile</Text>
      <Link to={SCREENS.Login}>Login</Link>
      <Button
        title="LOGOUT"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
};
