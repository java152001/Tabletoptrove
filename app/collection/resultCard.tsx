'use client'

import bgDataExtract from "../utils/bgDataExtract";
import { Card, Image, Text, Button, Group } from '@mantine/core';
import { useState, useEffect } from "react";

export default function ResultCard(props: { id: string, userId: number }) {

    const searchUrl = `https://boardgamegeek.com/xmlapi2/thing?id=${props.id}`
    const [bgData, setbgData] = useState({})
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(searchUrl)
            .then(response => response.text())
            .then(data => new window.DOMParser().parseFromString(data, 'text/xml'))
            .then(parsedData => {
                setbgData(bgDataExtract(parsedData));
                setLoading(false);
            });
    }, []);

    const handleSave = () => {
        fetch(`/api/collection/save`, {
            method: 'POST',
            body: JSON.stringify({
                bgData: bgData,
                id: props.userId
            })
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    if (isLoading) return <p>Loading...</p>

    return (
        <Card shadow="xm" padding='lg' radius='md' withBorder mb='md'>
            <Card.Section>
                <Image 
                    src={ bgData.image }
                    height={160}
                    alt={ bgData.name }
                />
            </Card.Section>

            <Group justify="center" mt='md' mb='xs'>
                <Text fw={500}>{ bgData.name }</Text>
            </Group>

            <Button color='blue' fullWidth mt='md' radius='md' onClick={handleSave}>
                Add to Collection
            </Button>
        </Card>
    )
}