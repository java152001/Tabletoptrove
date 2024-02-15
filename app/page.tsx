import { getServerSession } from 'next-auth';
import Landing from './components/landingHero/landingHero';
import { options } from './api/auth/[...nextauth]/options';
import LandingHero from './components/landingHero/landingHero';


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

    return (
        <main>
            <LandingHero email={session?.user?.email ?? ''} />
        </main>
    );
}
