import { ChatType } from '@/app/types/enmu';

/**
 * 聊天上传文件
 * @param toUserId
 * @param msgType
 */
export const chatUploadUrl = (toUserId: number, msgType: ChatType) =>
  `/api/upload/upLoadMessage?toUserId=${toUserId}&msgType=${msgType}`;
