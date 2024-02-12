import { client } from "@/app/utils/configSanity";
import { Group, Stack, Title, Text, Image, Container } from '@mantine/core';

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

    return (
        <Container>
            <Group>
                <Stack>
                    <Group>
                        {game[0].categories.map((category) => <Text>{category}</Text>)}
                    </Group>
                </Stack>
            </Group>
            <h1>The id is {params.gameid}</h1>
        </Container>
    )
}