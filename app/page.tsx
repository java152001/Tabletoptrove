import { getServerSession } from 'next-auth';
import Landing from './components/landing/landing';
import { options } from './api/auth/[...nextauth]/options';

export default async function Home() {

  type NewSession = {
    user: {
      email: string | null | undefined;
      id: number | null | undefined;
      name: string | null | undefined;
      image: string | null | undefined;
    }
  }

  const session = await getServerSession(options) as NewSession;

  console.log(session);


  if (session) {
    return (
      <div>
        <Landing email={session?.user?.email ?? ''} />
      </div>
    )
  }
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  );
}
