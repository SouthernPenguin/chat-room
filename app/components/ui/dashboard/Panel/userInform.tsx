'use client';
import { Card, message, Upload, UploadProps } from 'antd';
import { upLoadUserImage } from '@/app/lib/api/upload';
import { getLocalStorage } from '@/app/utils';
import { IUser } from '@/app/types/user';

interface IProps {
  userInform: IUser;
}

const UserInform = (props: IProps) => {
  const { userInform } = props;
  const upLoadProps: UploadProps = {
    name: 'file',
    action: `${process.env.NEXT_PUBLIC_API_URL}${upLoadUserImage} `,
    headers: {
      authorization: `Bearer ${getLocalStorage()}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        message.info(`${info.file}${info.fileList}`);
      }
      if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    fileList: [],
  };

  return (
    <Card style={{ width: 500 }} className="mr-2">
      <div className="w-full flex ">
        <div className="w-20 h-20 bg-sky-200 rounded-full text-center overflow-hidden mr-3">
          <Upload {...upLoadProps}>
            <img src={userInform.headerImg} />
          </Upload>
        </div>
        <ul className="flex-1">
          <li>昵称：{userInform.nickname || userInform.name}</li>
          <li>性别：{userInform.gender === 1 ? '男' : '女'}</li>
          {/*<li>个性签名：{userInform.name}</li>*/}
        </ul>
      </div>
    </Card>
  );
};

export default UserInform;
