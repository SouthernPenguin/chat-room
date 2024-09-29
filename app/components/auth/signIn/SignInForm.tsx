'use client';
import React from 'react';
import { login } from '@/app/lib/api/login';
import { Button } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignInForm = props => {
  const router = useRouter();

  console.log(props, 'SignInForm');

  const login1 = async () => {
    console.log(2222222);
    const res = await login({
      name: '产克太市花月',
      password: '123456',
    });

    const signInResponse = await signIn('credentials', {
      ...res.data.userInfo,
      token: res.data.token,
      redirect: false,
    });
  };

  if (props.session) {
    router.push('/dashboard');
    // Router.push('/dashboard');
  }

  return (
    <>
      <Button onClick={() => login1()}>登录</Button>
    </>
  );
};

export default SignInForm;
