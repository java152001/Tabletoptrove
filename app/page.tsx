import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import LandingHero from './components/landingHero/landingHero';
import InfoPanel from './components/infoPanel/infoPanel';


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
            <InfoPanel />
        </main>
    );
}
