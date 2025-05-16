import { useMutation } from '@tanstack/react-query';
import { instance } from 'frontend/app/api/axios.api';
import { UserLoginSchemaValues } from 'frontend/lib/validation/validation';
import { useState } from 'react';

type AuthTabs = 'login' | 'register';

export default function useGetAuth() {
  const [tab, setTab] = useState<AuthTabs>('login');

  const loginMutation = useMutation({
    mutationFn: (data: UserLoginSchemaValues) =>
      instance.post('/auth/login', data),
    mutationKey: ['login'],
  });

  const registerMutation = useMutation({
    mutationFn: (data: UserLoginSchemaValues) => instance.post('/user', data),
    mutationKey: ['register'],
  });

  return {
    tab,
    setTab,
    loginMutation,
    registerMutation,
  };
}
