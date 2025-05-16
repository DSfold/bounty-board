import axios, { AxiosHeaders } from 'axios';
import { useAuthStore } from '../../store/auth';

export const instance = axios.create({
  baseURL: 'http://localhost:3333/api',
  headers: new AxiosHeaders({
    Accept: 'application/json',
  }),
});

instance.interceptors.request.use(
  async (config) => {
    config.headers = new AxiosHeaders({
      ...config.headers,
      Authorization: 'Bearer ' + useAuthStore.getState().user?.access_token,
    });
    return config;
  },
  (err) => Promise.reject(err)
);
