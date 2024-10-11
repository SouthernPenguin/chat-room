import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  try {
    const token = await getToken({
      req: request,
      secret: 'your-secret-key',
      // cookieName: 'jwt', // next-auth.session-token
    });

    if (!token?.token && pathname !== '/signin') {
      const r = new URL('/signin', request.url);
      return NextResponse.redirect(r);
    }

    if (token?.token && (pathname === '/signin' || pathname === '/')) {
      const r = new URL('/dashboard', request.url);
      return NextResponse.redirect(r);
    }
    return NextResponse.next();
  } catch (error) {
    console.log(error, 'ss');
  }
}

// 受中间件影响的路由
export const config = { matcher: ['/signin', '/', '/dashboard/:path*'] };
