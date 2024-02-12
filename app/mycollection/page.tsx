import { client } from '../utils/configSanity'
import Link from 'next/link';
import { Table, TableThead, TableTr, TableTh, TableTd, TableTbody } from '@mantine/core';

interface ICollection {
    _id: string;
    name: string;
    minPlayers: number,
    maxPlayers: number,
    playTime: number,
    minAge: number
}

async function getCollection() {
    const query = '*[_type == "collection"]{_id, name, minPlayers, maxPlayers, playTime, minAge}';

    const data = await client.fetch(query);

    return data as ICollection[];
}

export default async function MyCollection() {

    const data = (await getCollection()) as ICollection[];

    const rows = data.map((ele) => {

        const { _id, name, playTime, minAge, minPlayers, maxPlayers } = ele;
        return (
            <TableTr key={_id}>
                <TableTd><Link href={`/games/${_id}`}>{name}</Link></TableTd>
                <TableTd>{playTime}</TableTd>
                <TableTd>{minAge}</TableTd>
                <TableTd>{minPlayers}</TableTd>
                <TableTd>{maxPlayers}</TableTd>
            </TableTr>
        )
    })

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
            <TableTbody>
                {rows}
            </TableTbody>
        </Table>
    )

}