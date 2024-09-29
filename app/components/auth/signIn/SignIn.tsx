import React, { useEffect } from 'react';
import SignInForm from './SignInForm';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <SignInForm session={JSON.stringify(session)} />
    </>
  );
}
