'use client'

import { TextInput, Button, Group, Box, Container, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';

export default function Form() {
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
        }
    });

    return (
        <Container bg='var(--mantine-color-blue-light' mt='100' p='25'>
            <Box maw={340} mx='auto'>
                <Text size='lg' mb='25' ta='center'>Welcome to Board Game Collection!</Text>
                <form onSubmit={form.onSubmit(async (values) => {
                  const response = await fetch(`/api/auth/register`, {
                      method: 'POST',
                      body: JSON.stringify({
                          email: values.email,
                          password: values.password
                      })
                  })  
                })}>
                    <TextInput
                        withAsterisk
                        label='Email'
                        placeholder='your@email.com'
                        type='email'
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        withAsterisk
                        label='Password'
                        placeholder='password'
                        type='password'
                        {...form.getInputProps('password')}
                    />
                    <Group justify='flex-end' mt='md'>
                        <Button type='submit'>Submit</Button>
                    </Group>
                    <Group justify='center' mt='md'>
                        <Text size='sm'>Already have an account?</Text>
                    </Group>
                    <Group justify='center' mt='md'>
                        <Text size='sm' c='blue'>
                            <Link href='/api/auth/signin'>Sign in here</Link>
                        </Text>
                    </Group>
                </form>
            </Box>
        </Container>
    )
}