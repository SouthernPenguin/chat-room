import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User;
  }

  interface User extends DefaultUser {
    id: number | string;
    name: string;
    nickname: string;
    headerImg: string;
    gender: number;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: number | string;
    name: string;
    nickname: string;
    headerImg: string;
    gender: number;
    token: string;
    username: string;
    role: string;
  }
}
