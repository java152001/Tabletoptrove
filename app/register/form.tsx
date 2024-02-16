'use client'

import { TextInput, Button, Group, Box, Container, Text, UnstyledButton } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import styles from './page.module.css';
import { useState } from 'react';

export default function Form() {
    const signupForm = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            confirmPassword: (value, values) => value !== values.password ? 'Passwords do not match' : null
        }
    });

    let [formMethod, setFormMethod] = useState('signup');

    return (
        <Container bg='var(--mantine-color-blue-light' mt='100' p='25'>
            <Box maw={340} mx='auto'>
                <Text size='lg' mb='25' ta='center'>Welcome to Tabletop Trove</Text>
                <Group
                    justify='space-between'
                    classNames={{
                        root: styles.noGap
                    }}
                >
                    <UnstyledButton
                        w='49%'
                        ta='center'
                        pt='15'
                        pb='12'
                        styles={{
                            root: {
                                backgroundColor: '#AEF6C7',
                                borderTopLeftRadius: '25px',
                                borderTopRightRadius: '25px'
                            }
                        }}
                        onClick={() => { setFormMethod('signup') }}
                    >
                        Sign Up
                    </UnstyledButton>
                    <UnstyledButton
                        w='49%'
                        ta='center'
                        pt='15'
                        pb='12'
                        styles={{
                            root: {
                                backgroundColor: '#AEF6C7',
                                borderTopLeftRadius: '25px',
                                borderTopRightRadius: '25px'
                            }
                        }}
                        onClick={() => { setFormMethod('login')}}
                    >
                        Login
                    </UnstyledButton>
                </Group>
                <form className={styles.signInForm} onSubmit={signupForm.onSubmit(async (values) => {

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
                        {...signupForm.getInputProps('email')}
                    />
                    <TextInput
                        withAsterisk
                        label='Password'
                        placeholder='password'
                        type='password'
                        {...signupForm.getInputProps('password')}
                    />
                    <TextInput 
                        withAsterisk
                        label='Confirm Password'
                        placeholder='password'
                        type='password'
                        {...signupForm.getInputProps('confirmPassword')}
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