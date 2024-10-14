'use client';
import React, { useState } from 'react';
import userJWT from '@/app/lib/api/login';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ApiOutlined, KeyOutlined, LockFilled, UserOutlined, LoadingOutlined } from '@ant-design/icons';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { message, Spin } from 'antd';
import useUserStore from '@/app/store/user';
import { setLocalStorage } from '@/app/utils';
import { __REFRESH_TOKEN__ } from '@/app/utils/constant';

// 定义验证模式
const schema = z.object({
  name: z.string().min(1, '请输入账号'),
  password: z.string().min(6, '请输入密码'),
});
type FormData = z.infer<typeof schema>;

const SignInForm = () => {
  const [flag, setFlag] = useState<boolean>(false); // 登录注册
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // 是否显示密码
  const { setUserInfo, user } = useUserStore();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (flag) {
      // 注册
      const res = await userJWT.register({
        name: data.name,
        password: data.password,
      });
      if (res.success) {
        message.success('注册成功请登录');
        setValue('password', '');
        setFlag(false);
      }
    } else {
      try {
        setLoading(true);
        // 登录
        const res = await userJWT.login({
          name: data.name,
          password: data.password,
        });

        const signInResult = await signIn('credentials', {
          ...res.data.userInfo,
          token: res.data.token,
          redirect: false,
        });
        if (signInResult?.ok) {
          setUserInfo(res.data.userInfo);
          setLocalStorage(res.data.token);
          setLocalStorage(res.data.refreshToken, __REFRESH_TOKEN__);
          router.replace('/dashboard');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-mainBackground h-screen w-full relative">
      <div className="text-white w-fit absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
        <h1 className=" font-extrabold text-2xl mb-2">
          <span className={`${flag ? 'text-gray-400 text-sm' : null} transition-all`} onClick={() => setFlag(false)}>
            登录
          </span>
          /
          <span className={`${flag ? null : 'text-gray-400 text-sm'} transition-all`} onClick={() => setFlag(true)}>
            注册
          </span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="mr-3  w-80  ">
              <div className="bg-gray-400 mb-3 h-14 rounded-md box-border p-2 flex justify-between">
                <div className="flex flex-col w-full">
                  <input
                    className="w-full h-full bg-inherit mr-2 d focus:outline-none placeholder:text-gray-300"
                    placeholder="用户名"
                    {...register('name')}
                  />
                  {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                </div>

                <UserOutlined className=" text-xl" />
              </div>
              <div className="bg-gray-400 h-14  rounded-md box-border p-2  flex justify-between">
                <div className="flex flex-col w-full">
                  <input
                    className="w-full h-full bg-inherit focus:outline-none mr-2 placeholder:text-gray-300"
                    placeholder="密码"
                    type={!showPassword ? 'password' : 'text'}
                    {...register('password')}
                  />
                  {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
                </div>
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

      <Spin spinning={loading} fullscreen indicator={<LoadingOutlined spin />} />
    </div>
  );
};

export default SignInForm;
