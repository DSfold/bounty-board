import axios from 'node_modules/axios/index.cjs';

export const instance = axios.create({
  baseURL: 'http/localhost:3333/api',
  headers: {
    Authorization: 'Bearer' + '',
  },
});
