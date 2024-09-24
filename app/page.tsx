'use client';
import Image from 'next/image';
import { useBearStore } from './store/user';

export default function Home() {
  const { bears, list, user, increase, reduce, addArr, popArr, changeUser, changeAge } = useBearStore();
  return (
    <div>
      <h1 onClick={() => increase(1)}>加法</h1>
      <h1 onClick={() => reduce(9)}>减法</h1>
      <h1 onClick={() => addArr(Date())}>添加数组</h1>
      <h1 onClick={() => popArr()}>删除数组</h1>
      <h1 onClick={() => changeUser({ name: 's', age: 10 })}>设置用户信息</h1>
      <h1 onClick={() => changeAge(333)}>设置年龄</h1>
      <h1> 数量：{bears}</h1>
      数组
      {list.length &&
        list.map((item, index) => {
          return <h1 key={index}>{item}</h1>;
        })}
      <br />
      用户信息: {user.name} - {user.age}
    </div>
  );
}
