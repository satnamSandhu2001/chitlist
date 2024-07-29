import React, { useState } from 'react';
import { loginSchema } from '../utils/zod/loginSchema';
import axios from 'axios';
import { API_BASE_URL } from '../utils/config';
import { Alert } from 'react-native';
import keychain from 'react-native-keychain';
import { ZodIssue } from 'zod';

type IUser = {
  id: number | string;
  email: string;
  name: string;
  fcmToken?: string | null;
};
type ILoginProps = { email: string; password: string };
type ContextProps = {
  loading: boolean;
  isAuth: boolean;
  user: null | IUser;
  errors: null | ZodIssue[];
  login: ({ email, password }: ILoginProps) => Promise<void>;
  logout: () => Promise<void>;
};

const initialValue: ContextProps = {
  loading: false,
  isAuth: false,
  user: null,
  errors: null,
  login: async () => {},
  logout: async () => {},
};

export const UserContext = React.createContext<ContextProps>(initialValue);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setuser] = React.useState<ContextProps['user']>(null);
  const [loading, setloading] = React.useState<ContextProps['loading']>(false);
  const [errors, seterrors] = useState<ContextProps['errors']>(null);

  const login = async (formData: ILoginProps) => {
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
          'x-client-type': 'native-app',
        },
      });
      setuser(response.data.user);

      await keychain.setGenericPassword('token', response.data.token);
    } catch (err: any) {
      setuser(null);
      if (err.code === 'ERR_NETWORK') {
        Alert.alert('Please check your Internet connection!');
      } else if (err.response?.data?.errors) {
        seterrors(err.response.data.errors);
      } else {
        Alert.alert('Something went wrong! Please try again');
      }
    } finally {
      setloading(false);
    }
  };

  const logout = async () => {
    try {
      setloading(true);
      await axios({
        method: 'get',
        url: API_BASE_URL + '/api/v1/auth/logout',

        headers: {
          'x-client-type': 'native-app',
        },
      });
      setuser(null);
      await keychain.resetGenericPassword();
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK') {
        Alert.alert('Please check your Internet connection!');
      } else {
        Alert.alert('Something went wrong! Please try again');
      }
    } finally {
      setloading(false);
    }
  };

  const getMyData = async () => {
    try {
      let token = await keychain.getGenericPassword();
      if (!token) {
        return;
      }
      let response: IUser = await axios({
        method: 'get',
        url: API_BASE_URL + '/api/v1/user/me',
        headers: {
          'x-client-type': 'native-app',
          authorization: `Bearer ${token.password}`,
        },
      });
      setuser(response);
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK') {
        Alert.alert('Please check your Internet connection!');
      }
    } finally {
      setloading(false);
    }
  };
  React.useEffect(() => {
    getMyData();
  }, []);
  return (
    <UserContext.Provider
      value={{ user, isAuth: !!user, errors, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
