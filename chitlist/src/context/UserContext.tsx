import React, { useState } from 'react';
import { loginSchema } from '../utils/zod/userSchema';
import { Alert } from 'react-native';
import keychain from 'react-native-keychain';
import { ZodIssue } from 'zod';
import api from '../utils/api';

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
  getMyData: () => Promise<void>;
};

const initialValue: ContextProps = {
  loading: false,
  isAuth: false,
  user: null,
  errors: null,
  login: async () => {},
  logout: async () => {},
  getMyData: async () => {},
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
      let response = await api.post('/api/v1/auth/login', formData);
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
      await api.get('/api/v1/auth/logout');
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
      let { data } = await api('/api/v1/user/me');
      setuser(data);
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
      value={{
        user,
        isAuth: !!user,
        errors,
        loading,
        login,
        logout,
        getMyData,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
