'use client';
import React, { useEffect, useState,FormEvent } from 'react';
import { login } from '@/app/lib/api/login';
import { Button } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ApiOutlined, KeyOutlined, LockFilled, UserOutlined } from '@ant-design/icons';

const SignInForm = props => {
  const [flag, setFlag] = useState<boolean>(false); // 登录注册
  const [showPassword, setShowPassword] = useState<boolean>(false); // 是否显示密码

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止默认提交行为
    const res = await login({
      name: '产克太市花月',
      password: '123456',
    });

    await signIn('credentials', {
      ...res.data.userInfo,
      token: res.data.token,
      redirect: false,
    });
  };

  useEffect(() => {
    if (props.session) {
      router.push('/dashboard');
    }
  }, [props.session]);

  return (
    <div className="bg-mainBackground h-screen w-full relative">
      <div className="text-white w-fit absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
        <h1 className=" font-extrabold text-2xl mb-2">
          <span className={`${flag ? 'text-gray-400' : null}`} onClick={() => setFlag(false)}>
            登录
          </span>
          /
          <span className={`${flag ? null : 'text-gray-400'}`} onClick={() => setFlag(true)}>
            注册
          </span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="mr-3  w-80  ">
              <div className="bg-gray-400 mb-3 h-14 rounded-md box-border p-2 flex justify-between">
                <input
                  className="w-full h-full bg-inherit mr-2 d focus:outline-none placeholder:text-gray-300"
                  placeholder="用户名"
                />
                <UserOutlined className=" text-xl" />
              </div>
              <div className="bg-gray-400 h-14  rounded-md box-border p-2  flex justify-between">
                <input
                  className="w-full h-full bg-inherit focus:outline-none mr-2 placeholder:text-gray-300"
                  placeholder="密码"
                  type={!showPassword ? 'password' : 'text'}
                />
                {showPassword && <KeyOutlined className="text-xl" onClick={() => setShowPassword(false)} />}
                {!showPassword && <LockFilled className="text-xl" onClick={() => setShowPassword(true)} />}
              </div>
            </div>
            <button className="bg-mainForeground text-xl w-12 rounded-md flex items-center justify-center">
              {!flag && <LockFilled />}
              {flag && <ApiOutlined />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
