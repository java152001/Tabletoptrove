'use client'

import { TextInput, Button, Group, Box, Container, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import ResultCard from './resultCard';
import xml2json from '../utils/xml2json';
import { useState } from 'react';

export default function SearchForm(props: { id: number }) {

    const [searchResults, setSearchResults] = useState({});

    const form = useForm({
        initialValues: {
            name: ''
        }
    });

    let searchList;

    if (Object.keys(searchResults).length === 0) {
        searchList = <div></div>
    } else {
        searchList = 
        <div>
            <Title>Here are the results we found</Title>
             { Object.keys(searchResults.items).map(key => {
                return (
                    <ResultCard key={key.split(' ')[1]} id={key.split(' ')[1]} userId={props.id} />
                )
            }) }
        </div>
    }

    const searchUrl = (query: string): string => `https://boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame`

    return (
        <Container bg='var(--mantine-color-blue-light)' mt='100' p='25'>
            <Stack>
                <Box maw={340} mx='auto'>
                    <form onSubmit={form.onSubmit(async (values) => {
                        const response = await fetch(searchUrl(values.name));
                        const data = await response.text();
                        const parsedData = await new window.DOMParser().parseFromString(data, 'text/xml');
                        console.log(xml2json(parsedData));
                        setSearchResults(xml2json(parsedData));
                    })}>
                        <TextInput
                            withAsterisk
                            label='Board Game Name'
                            placeholder='Board Game Name'
                            type='text'
                            {...form.getInputProps('name')}
                        />
                        <Group justify='flex-end' mt='md'>
                            <Button type='submit'>Search</Button>
                        </Group>
                    </form>
                </Box>
                <Box maw={340} mx='auto'>
                    <Group gap='md'>
                        {searchList}
                    </Group>
                </Box>
            </Stack>
        </Container>
    )
}