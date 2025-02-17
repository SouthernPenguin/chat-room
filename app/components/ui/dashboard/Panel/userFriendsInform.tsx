'use client';
import * as echarts from 'echarts';
import { Card } from 'antd';
import React, { useEffect, useRef } from 'react';
import { IUserFriendInformation } from '@/app/types/panel';

interface IProps {
  userFriendInformation: IUserFriendInformation;
}

const UserFriendsInform = (props: IProps) => {
  const { userFriendInformation } = props;

  const manWomenRef = useRef<HTMLDivElement>(null);
  const peoplesGroupChatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    manWomen();
    peoplesGroupChats();
  }, []);

  const manWomen = () => {
    const chartInstance = echarts.init(manWomenRef.current);
    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '1%',
        left: 'center',
      },
      series: [
        {
          center: ['50%', '60%'],
          name: '',
          type: 'pie',
          radius: ['40%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 20,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: userFriendInformation.manWomamNumber.filter(item => item.gender === '男')[0].number,
              name: '男',
              itemStyle: { color: 'rgb(115, 192, 222)' },
            },
            {
              value: userFriendInformation.manWomamNumber.filter(item => item.gender === '女')[0].number,
              name: '女',
              itemStyle: { color: 'pink' },
            },
          ],
        },
      ],
    };
    chartInstance.setOption(option);
  };

  const peoplesGroupChats = () => {
    const chartInstance = echarts.init(peoplesGroupChatsRef.current);
    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '1%',
        left: 'center',
      },
      series: [
        {
          center: ['50%', '60%'],
          name: '',
          type: 'pie',
          radius: ['40%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 20,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: userFriendInformation.peopleNumber, name: '总人数', itemStyle: { color: 'rgb(115, 192, 222)' } },
            { value: userFriendInformation.groupChatNumber, name: '总群数', itemStyle: { color: 'pink' } },
          ],
        },
      ],
    };
    chartInstance.setOption(option);
  };

  return (
    <>
      <Card ref={manWomenRef} style={{ width: '250px' }} className="mr-2"></Card>
      <Card ref={peoplesGroupChatsRef} style={{ width: '250px' }}></Card>
    </>
  );
};
export default UserFriendsInform;
