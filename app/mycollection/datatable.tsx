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

    const rows = gameData.data.map((ele => {
        const { _id, image, name, playTime, minAge, minPlayers, maxPlayers } = ele;

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
                            <TableTh>Game Name</TableTh>
                            <TableTh>Play Time</TableTh>
                            <TableTh>Minimum Age</TableTh>
                            <TableTh>Minimum Players</TableTh>
                            <TableTh>Maximum Players</TableTh>
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