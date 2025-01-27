export interface IUser {
  id: number;
  name: string;
  nickname: string | null;
  headerImg: string | undefined;
  gender: number | null;
  isCheck?: boolean;
}
