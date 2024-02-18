'use client'

import { TableTbody, TableTr, TableTd } from '@mantine/core';
import Link from 'next/link';
import { useState, useEffect } from 'react';


export default function DataTable({ id }: { id: number | null | undefined }) {

    const [gameData, setGameData] = useState({ data: [] });

    useEffect(() => {
        fetch(`/api/collection/get?id=${id}`)
            .then(response => response.json())
            .then(data => setGameData(data))
    }, [])

    const rows = gameData.data.map((ele => {
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
    }))
    
    return (
        <TableTbody>
            { rows }
        </TableTbody>
    )
}