import { Table, TableThead, TableTr, TableTh, TableTd, TableTbody } from '@mantine/core';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { client } from '../utils/configSanity';
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
        <Table>
            <TableThead>
                <TableTr>
                    <TableTh>Game Name</TableTh>
                    <TableTh>Play Time</TableTh>
                    <TableTh>Minimum Age</TableTh>
                    <TableTh>Minimum Players</TableTh>
                    <TableTh>Maximum Players</TableTh>
                </TableTr>
            </TableThead>
            {session && <DataTable id={session.user.id} />}
        </Table>
    )

}