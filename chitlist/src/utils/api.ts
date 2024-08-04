import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './config';
import * as Keychain from 'react-native-keychain';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-client-type': 'native-app',
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.headers['x-client-type'] = 'native-app';
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { password: token } = credentials;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default api;
