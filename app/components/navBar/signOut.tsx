'use client'

import { signOut } from 'next-auth/react';
import { UnstyledButton } from "@mantine/core"

export default function SignOutBtn() {
    return (
        <UnstyledButton ml='25' onClick={() => signOut()}>Signout</UnstyledButton>
    )
}