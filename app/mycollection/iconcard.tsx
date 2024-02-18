'use client'
import { Card, Image, Text, Button, Group } from "@mantine/core"

export default function IconCard({ ele }) {


    return (
        <Card shadow='sm' padding='lg' radius='md' withBorder h='100%'>
            <Card.Section component="a" href='www.google.com'>
                <Image
                    src={ ele.image }
                    height={100}
                    width={100}
                    alt={ ele.name }
                    mah={100}
                />
            </Card.Section>
            <Group justify="space-between" mt='md' mb='xs'>
                <Text fw={500}>{ ele.name }</Text>
                <Button size='compact-xs'>Remove</Button>
            </Group>
        </Card>
    )
}