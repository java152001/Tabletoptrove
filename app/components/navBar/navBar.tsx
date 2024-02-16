import { Group, UnstyledButton, NavLink } from "@mantine/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDragon, faHatWizard, faDiceD20, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import SignOutBtn from "./signOut";

export default function NavBar({ email }: { email: string }) {

    return (
        <>

        { email === ''
            ?
            <Group
                classNames={{
                    root: 'nowrap'
                }}
                justify="flex-end"
            >
                <NavLink
                    w='initial'
                    href='/register?method=signup'
                    label='Sign Up'
                    leftSection={<FontAwesomeIcon icon={faDragon} style={{ fontSize: '12px', height: '12px'}} size="lg" />}
                />
                <NavLink
                    w='initial'
                    href='/register?method=login'
                    label='Login'
                    leftSection={<FontAwesomeIcon icon={faHatWizard} style={{ fontSize: '12px', height: '12px'}} size="lg" />}
                />    
            </Group>
            :
            <Group
                classNames={{
                    root: 'nowrap'
                }}
                justify="space-between"
                pl='30'
            >
                <Group 
                    justify="flex-start"
                >
                    <h1>Welcome {email}</h1>
                    <SignOutBtn />
                </Group>
                <Group
                    justify="flex-end"
                >
                    <NavLink
                        w='initial'
                        href='/mycollection'
                        label='My Collection'
                        leftSection={<FontAwesomeIcon icon={faDiceD20} style={{ fontSize: '12px', height: '12px'}} size="lg" />}
                    />
                    <NavLink
                        w='initial'
                        href='/wishlist'
                        label='My Wishlist'
                        leftSection={<FontAwesomeIcon icon={faWandSparkles} style={{ fontSize: '12px', height: '12px'}} size="lg" />}
                    />    
                </Group>
            </Group>
        }
        </>
    )
}