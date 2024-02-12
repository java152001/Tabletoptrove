import Image from "next/image";
import Link from "next/link";
import { Group, Stack, Box, Title, Button } from "@mantine/core";

export default function Landing(props: { email: string }) {
    return (
        <>
            <div className='bg-gradient-to-b from-forest-green to-moss-green w-svw' style={{height: '50vh'}} >
                <Group justify="space-between" align="center" h='100%' w='70%' mx='auto'>
                    <Box>
                        <Stack align="center">
                            <Title order={1}>Welcome {props.email} to Your Board Game Collection</Title>
                            <Button mt='25' w='30%' variant='filled'>
                                Create your Collection
                            </Button>
                        </Stack>
                    </Box>
                    <Image 
                        src='/d20red.png'
                        width={300}
                        height={300}
                        alt='Picture of Dice'
                        style={{
                            opacity: '.7',
                            transform: 'rotate(33deg)'
                        }}
                    />
                </Group>
                 
            </div>
        </>
    )
}