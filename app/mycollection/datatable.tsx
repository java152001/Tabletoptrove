'use client'

import { Grid, Button, Container, Table, TableThead, TableTh, TableTbody, TableTr, TableTd, Box, UnstyledButton, Group } from '@mantine/core';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import IconCard from './iconcard';


export default function DataTable({ id }: { id: number | null | undefined }) {

    const [gameData, setGameData] = useState({ data: [] });
    const [viewMode, setViewMode] = useState('list');

    useEffect(() => {
        fetch(`/api/collection/get?id=${id}`)
            .then(response => response.json())
            .then(data => setGameData(data))
    }, [])

    const filterList = (filterType: string) => {
        const gdCopy = [...gameData.data]

        switch (filterType) {

            case 'name':
                gdCopy.sort((a, b) => a.name.localeCompare(b.name));
                setGameData({ data: gdCopy });
            break;

            case 'playTime':
                gdCopy.sort((a, b) => a.playTime - b.playTime);
                setGameData({ data: gdCopy});
            break;

            case 'minAge':
                gdCopy.sort((a, b) => a.minAge - b.minAge);
                setGameData({ data: gdCopy});
            break;

            case 'minPlayers':
                gdCopy.sort((a, b) => a.minPlayers - b.minPlayers);
                setGameData({ data: gdCopy});
            break;

            case 'maxPlayers':
                gdCopy.sort((a, b) => a.maxPlayers - b.maxPlayers);
                setGameData({ data: gdCopy});
            break;
        }
    }

    const rows = gameData.data.map((ele => {
        const { _id, name, playTime, minAge, minPlayers, maxPlayers } = ele;

        let fontSize: string = '14px'

        if (name.length >= 40) {
            fontSize = '12px'
        }

        if (viewMode === 'list') {
            return (
                <TableTr key={_id}>
                    <TableTd>
                        <Group justify='space-between'>
                            <Link style={{fontSize: fontSize}} href={`/games/${_id}`}>{name}</Link>
                        </Group>
                    </TableTd>
                    <TableTd>{playTime}</TableTd>
                    <TableTd>{minAge}</TableTd>
                    <TableTd>{minPlayers}</TableTd>
                    <TableTd>{maxPlayers}</TableTd>
                    <TableTd>
                        <UnstyledButton
                                styles={{
                                    root: {
                                        fontSize: '8px',
                                        marginLeft: '8px',
                                        background: 'red',
                                        padding: '10px',
                                        borderRadius: '50%',
                                        color: '#FFF',
                                        boxShadow: '0 2px 4px darkslategrey'
                                    }
                                }}
                            >X</UnstyledButton>
                    </TableTd>
                </TableTr>
            )
        } else {
            return (
                <Grid.Col span={3}>
                    <IconCard key={_id} ele={ele} />
                </Grid.Col>
            )
        }       
    }))
    
    return (
        <Box
            style={{
                background: '#15616D',
                height: '100%',
                paddingTop: '100px',
                paddingBottom: '100px'
            }}
        >
            <Container styles={{
                root: {
                    borderRadius: '25px',
                    background: '#B9F5D8',
                    padding: '30px'
                }
            }}>
            <Group mb='25px' justify='space-between'>
                <Group>
                    <Button
                        onClick={() => setViewMode('list')}
                    >
                        List View
                    </Button>
                    <Button
                        onClick={() => setViewMode('tile')}
                    >
                        Tile View
                    </Button>
                </Group>
                    <Link href='/collection'>Add More Games</Link>
            </Group>
            { viewMode === 'list'
                ?
                <Table>
                    <TableThead>
                        <TableTr>
                            <TableTh onClick={() => filterList('name')}>Game Name</TableTh>
                            <TableTh onClick={() => filterList('playTime')}>Play Time</TableTh>
                            <TableTh onClick={() => filterList('minAge')}>Minimum Age</TableTh>
                            <TableTh onClick={() => filterList('minPlayers')}>Minimum Players</TableTh>
                            <TableTh onClick={() => filterList('maxPlayers')}>Maximum Players</TableTh>
                            <TableTh>Remove?</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        { rows }
                    </TableTbody>
                </Table>
                :
                <Grid align='stretch'>
                    { rows }
                </Grid>
            }
            </Container>
        </Box>
    )
}