import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import InputWithIcon from '../../components/InputWithIcon';
import Paragraph from '../../components/Paragraph';
import { SCREENS } from '../../constants/screens';
import { Link } from '@react-navigation/native';
import ButtonSecondary from '../../components/ButtonSecondary';
import { UserContext } from '../../context/UserContext';

type FormData = {
  email: string;
  password: string;
};

const Form = () => {
  const { login, errors, loading } = useContext(UserContext);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  // filter validation error
  const getFieldError = (fieldName: keyof FormData) =>
    errors?.find(err => err.path?.[0] === fieldName)?.message;

  const handleLoginSubmit = async () => {
    login(formData);
  };

  return (
    <View className="px-10 w-full flex-1" style={{ gap: 20 }}>
      <InputWithIcon
        value={formData.email}
        onChangeText={handleInputChange('email')}
        keyboardType="email-address"
        placeholder="Your email"
        icon="person"
        error={getFieldError('password')}
        autoComplete="email"
      />
      <InputWithIcon
        value={formData.password}
        onChangeText={handleInputChange('password')}
        placeholder="Password"
        icon="lock-closed"
        error={getFieldError('password')}
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
