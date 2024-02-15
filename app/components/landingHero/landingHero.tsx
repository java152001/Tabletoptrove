import Image from "next/image";
import Link from "next/link";
import { Group, Stack, Title, Button, Text, MantineProvider, rem } from "@mantine/core";

export default function LandingHero(props: { email: string }) {
    return (
        <>
            <div className='bg-main-green' style={{ height: '80vh' }} >
                <Group justify="space-between" align="center" h='100%' w='70%' mx='auto'>
                    <Stack align="flex-start">
                        <MantineProvider
                            theme={{
                                fontFamily: 'var(--font-martelSans)',
                                fontSizes: {
                                    md: rem(16),
                                    lg: rem(36)
                                },
                                headings: {
                                    fontFamily: 'var(--font-martelSans)',
                                    sizes: {
                                        h1: {
                                            fontWeight: '900',
                                            fontSize: rem(58)
                                        }
                                    }
                                },
                                colors: {
                                    'button-green': [
                                        "#ebf9f0",
                                        "#e1ece3",
                                        "#c5d4c8",
                                        "#a7bdaa",
                                        "#8da992",
                                        "#7c9c81",
                                        "#729678",
                                        "#608266",
                                        "#537459",
                                        "#436549"
                                      ]
                                }
                            }}
                        >
                            <Title
                                order={1}
                                styles={{
                                    root: {
                                        letterSpacing: '-3px'
                                    }
                                }}
                            >Tabletop Trove</Title>
                            <Text size='lg'>Save your games today!</Text>
                            <Button tt='uppercase' c='black' size='md' mt='25' variant='filled' color='button-green.6' style={[{ border: '2px solid black' }, { borderRadius: '0'}]} >
                                Save your collection
                            </Button>
                        </MantineProvider>
                    </Stack>
                    <Image
                        src='/d20red.png'
                        width={588}
                        height={588}
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