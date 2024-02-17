'use client'

import { TextInput, Button, Group, Box, Container, Text, UnstyledButton } from '@mantine/core';
import { useForm } from '@mantine/form';
import { signIn } from 'next-auth/react';
import styles from './page.module.css';
import { useState } from 'react';

type btnStyles = {
    backgroundColor: string; 
    borderTopLeftRadius: string; 
    borderTopRightRadius: string
}

export default function Form({ method }: { method: string | string[] | undefined }) {
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

    const loginForm = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')        }
    })

    let [formMethod, setFormMethod] = useState(method);

    let  signUpStyles: btnStyles = {
        backgroundColor: '#AEF6C7',
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px'
    }

    let loginStyles: btnStyles = {
        backgroundColor: '#AEF6C7',
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px'
    }

    if (formMethod === 'signup') {
        loginStyles.backgroundColor = '#FFF'
        signUpStyles.backgroundColor = '#AEF6C7'
    }

    if (formMethod === 'login') {
        loginStyles.backgroundColor = '#AEF6C7'
        signUpStyles.backgroundColor = '#FFF'
    }

    return (
        <Container h='100vh' maw='100vw' mt='100' p='25' pt='100' styles={{
            root: {
                background: '#3E6259'
            }
        }}>
            <Box maw={340} mx='auto'>
                <Text size='lg' mb='25' ta='center'>Welcome to Tabletop Trove</Text>
                <Group
                    justify='space-between'
                    classNames={{
                        root: styles.noGap
                    }}
                >
                    <UnstyledButton
                        w='50%'
                        ta='center'
                        pt='15'
                        pb='12'
                        styles={{
                            root: signUpStyles
                        }}
                        onClick={() => { setFormMethod('signup') }}
                    >
                        Sign Up
                    </UnstyledButton>
                    <UnstyledButton
                        w='50%'
                        ta='center'
                        pt='15'
                        pb='12'
                        styles={{
                            root: loginStyles
                        }}
                        onClick={() => { setFormMethod('login')}}
                    >
                        Login
                    </UnstyledButton>
                </Group>
                { formMethod === 'signup'
                    ?
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
                    </form>
                    :
                    <form className={styles.signInForm} onSubmit={loginForm.onSubmit(async (values) => {

                        console.log(values);

                            const response = await signIn('credentials', {
                                email: values.email,
                                password: values.password,
                                redirect: true,
                                callbackUrl: "/"
                            })
                        })}>
                            <TextInput
                                withAsterisk
                                label='Email'
                                placeholder='your@email.com'
                                type='email'
                                {...loginForm.getInputProps('email')}
                            />
                            <TextInput
                                withAsterisk
                                label='Password'
                                placeholder='password'
                                type='password'
                                {...loginForm.getInputProps('password')}
                            />
                            <Group justify='flex-end' mt='md'>
                                <Button type='submit'>Submit</Button>
                            </Group>
                        </form>
                }
            </Box>
        </Container>
    )
}