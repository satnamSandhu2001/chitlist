import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import InputWithIcon from '../../components/InputWithIcon';
import Paragraph from '../../components/Paragraph';
import { SCREENS } from '../../constants/screens';
import { Link } from '@react-navigation/native';
import ButtonSecondary from '../../components/ButtonSecondary';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import { ZodIssue } from 'zod';
import { loginSchema } from '../../utils/zod/loginSchema';
import keychain from 'react-native-keychain';

type FormData = {
  email: string;
  password: string;
};

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, seterrors] = useState<null | ZodIssue[]>(null);
  const [loading, setloading] = useState<boolean>(false);

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLoginSubmit = async () => {
    try {
      setloading(true);
      seterrors(null);
      const validate = loginSchema.safeParse(formData);
      if (!validate.success) {
        seterrors(validate.error.issues);
        return;
      }
      let response = await axios({
        method: 'post',
        url: API_BASE_URL + '/api/v1/auth/login',
        data: validate.data,
        headers: {
          'x-client-type': 'Native-App',
        },
      });
      console.log(response.data); // TODO: store user data in contextAPI
      await keychain.setGenericPassword('token', response.data.token);
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK') {
        Alert.alert('Please check your Internet connection!');
      } else if (err.response?.data?.errors) {
        seterrors(err.response.data.errors);
      } else {
        Alert.alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <View className="px-10 w-full flex-1" style={{ gap: 20 }}>
      <InputWithIcon
        value={formData.email}
        onChangeText={handleInputChange('email')}
        keyboardType="email-address"
        placeholder="Your email"
        icon="person"
        error={errors?.find(err => err.path?.[0] === 'email')?.message}
        autoComplete="email"
      />
      <InputWithIcon
        value={formData.password}
        onChangeText={handleInputChange('password')}
        placeholder="Password"
        icon="lock-closed"
        error={errors?.find(err => err.path?.[0] === 'password')?.message}
        secureTextEntry={true}
      />
      {/* <Link to={{ screen: SCREENS.Signup }} style={{ textAlign: 'right' }}> */}
      <Paragraph variant="p3" classes="text-white text-right">
        Forgot Password?
      </Paragraph>
      {/* </Link> */}

      <View>
        <ButtonSecondary
          onPress={handleLoginSubmit}
          title="LOGIN"
          loading={loading}
        />
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
