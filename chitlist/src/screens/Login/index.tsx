import React from 'react';
import Container from '../../components/Container';
import { Image, View } from 'react-native';
import Paragraph from '../../components/Paragraph';
import Heading from '../../components/Heading';
import Form from './Form';
import { Link } from '@react-navigation/native';
import { SCREENS } from '../../constants/screens';

const Login = () => {
  return (
    <Container>
      <View className="flex-1 bg-primary-100">
        <View className="h-[25vh] overflow-hidden">
          <Image
            source={require('../../assets/images/login-bg.jpg')}
            className="w-full h-full object-cover bg-transparent shadow-xl shadow-black rounded-b-[170px] mx-auto"
          />
        </View>
        <Link
          to={'/' + SCREENS.Profile}
          style={{ backgroundColor: 'skyblue', padding: 20 }}>
          Profile
        </Link>

        <View className="px-4 pt-8 pb-12">
          <Heading
            variant="h1"
            classes="text-white text-center mx-auto font-bold">
            Welcome Back
          </Heading>
          <Paragraph variant="p2" classes="text-white mx-auto mt-2">
            Login to your account
          </Paragraph>
        </View>

        <Form />
      </View>
    </Container>
  );
};

export default Login;
