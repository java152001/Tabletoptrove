import { client } from "@/app/utils/configSanity";
import Link from "next/link";
import { Group, Stack, Title, Text, Image, Container, Box, Button } from '@mantine/core';

interface IGame {
    _id: string;
    name: string;
    image: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    playTime: number;
    minAge: number;
    categories: string[];
    mechanics: string[];
}

async function getGame(id: string) {
    const query = `*[_id == "${id}"]{_id, name, image, description, minPlayers, maxPlayers, playTime, minAge, categories, mechanics}`;
    const data = await client.fetch(query);
    return data as IGame[];
}

export default async function Page({ params }: { params: { gameid: string }}) {

    const game = (await getGame(params.gameid)) as IGame[];

    const description = game[0].description.split('&#10;').join('\n');

    return (
        <Container mt='75' className='bg-forest-green rounded-xl' p="xl">
            <Group 
                justify="space-evenly" 
                mb='xl'
                classNames={{
                    root: 'nowrap'
                }}>
                <Image
                    maw='35%' 
                    src={game[0].image}
                    alt={game[0].name}
                    height={250}
                    width={250}
                />
                <Stack>
                    <Stack>
                        <Box m='auto'>
                            <Button><Link href='/mycollection'>Back to your collection</Link></Button>
                        </Box>
                        <Group
                            justify="center"
                            classNames={{
                                root: 'nowrap'
                            }}
                        >
                            {game[0].categories.map((category) => <Text>{category}</Text>)}
                        </Group>
                        <Box>
                            <Title ta="center">{game[0].name}</Title>
                        </Box>
                        <Box>
                            <Group justify="center">
                                <Text>Play Time: {game[0].playTime}</Text>
                                <Text>Players: {game[0].minPlayers} - {game[0].maxPlayers}</Text>
                                <Text>Age: {game[0].minAge}</Text>
                            </Group>
                        </Box>
                        <Box>
                            <Group gap='0' justify="center">
                                {game[0].mechanics.map((mechanic) => <Text size="sm" mr='md'>{mechanic}</Text>)}
                            </Group>
                        </Box>
                    </Stack>
                </Stack>
            </Group>
            <Box>
                <Text size='sm' styles={{ root: { whiteSpace: 'pre-wrap' }}}>{description}</Text>
            </Box>
        </Container>
    )
}