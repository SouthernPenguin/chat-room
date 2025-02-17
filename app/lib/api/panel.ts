import { http } from '@/app/lib/server';
import { IUserInformPanel } from '@/app/types/panel';

export const getUserInformPanel = () => http.get<IUserInformPanel>('/summary-message/userInform');
