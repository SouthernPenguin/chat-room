import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

export default async function DashboardPage() {
  // const session = await getServerSession(authOptions);
  return <h1>Welcome to the Dashboard!</h1>;
}
