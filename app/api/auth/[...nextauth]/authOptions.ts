import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: '用户id', type: 'text' },
        name: { label: '用户名', type: 'text' },
        nickname: { label: '用户昵称', type: 'text' },
        headerImg: { label: '用户头像', type: 'text' },
        gender: { label: '用户性别', type: 'text' },
        token: { label: 'jwt', type: 'text' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.id || !credentials.name) {
          return null;
        }
        return {
          id: credentials?.id,
          name: credentials?.name,
          nickname: credentials?.nickname,
          headerImg: credentials?.headerImg,
          gender: credentials?.gender,
          token: credentials.token,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: 'your-secret-key',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === 'google' && profile && 'email_verified' in profile) {
        if (!profile.email_verified) return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.nickname = user.nickname;
        token.headerImg = user.headerImg;
        token.gender = user.gender;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.nickname = token.nickname;
      session.user.headerImg = token.headerImg;
      session.user.gender = token.gender;
      session.user.token = token.token;
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};
