import React from 'react';
import { View } from 'react-native';
import InputWithIcon from '../../components/InputWithIcon';
import Paragraph from '../../components/Paragraph';
import { SCREENS } from '../../constants/screens';
import { Link } from '@react-navigation/native';
import ButtonSecondary from '../../components/ButtonSecondary';

const Form = () => {
  return (
    <View className="px-10 w-full flex-1" style={{ gap: 20 }}>
      <InputWithIcon
        value=""
        onChangeText={_t => {}}
        placeholder="Your email"
        icon="person"
      />
      <InputWithIcon
        value=""
        onChangeText={_t => {}}
        placeholder="Password"
        icon="lock-closed"
        secureTextEntry={true}
      />
      {/* <Link to={{ screen: SCREENS.Signup }} style={{ textAlign: 'right' }}> */}
      <Paragraph variant="p3" classes="text-white text-right">
        Forgot Password?
      </Paragraph>
      {/* </Link> */}

      <View>
        <ButtonSecondary onPress={() => {}} title="LOGIN" />
        <Link
          to={{ screen: SCREENS.Signup }}
          style={{
            textAlign: 'center',
            marginTop: 6,
          }}>
          <Paragraph variant="p3" classes="text-white">
            Don't have an account?{' '}
          </Paragraph>
          <Paragraph variant="p3" classes="text-white font-bold underline">
            Sign up
          </Paragraph>
        </Link>
      </View>
    </View>
  );
};

export default Form;
