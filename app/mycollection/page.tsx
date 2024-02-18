import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import DataTable from './datatable';

export const revalidate = 0;

type NewSession = {
    user: {
        email: string | null | undefined;
        id: number | null | undefined;
        name: string | null | undefined;
        image: string | null | undefined;
    }
}

export default async function MyCollection() {

    const session = await getServerSession(options) as NewSession;

    return (
        <>
            {session && <DataTable id={session.user.id} />}
        </>
    )

}