import React from 'react';
import { Text } from 'react-native';
import Container from '../../components/Container';
import { Link } from '@react-navigation/native';
import { SCREENS } from '../../constants/screens';

const Signup = () => {
  return (
    <Container>
      <Text>Signup</Text>
      <Link
        to={'/Account/' + SCREENS.Profile}
        style={{ backgroundColor: 'skyblue', padding: 20 }}>
        Profile
      </Link>
      <Link
        to={'/Account/' + SCREENS.Todo}
        style={{ backgroundColor: 'skyblue', padding: 20 }}>
        Todo
      </Link>
    </Container>
  );
};

export default Signup;
