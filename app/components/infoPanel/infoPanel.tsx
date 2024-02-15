import { Box, Group, Text, Title, MantineProvider, Container, rem } from "@mantine/core";

export default function InfoPanel() {

    return (
        <>
        <MantineProvider
            theme={{
                fontSizes: {
                    md: rem(16),
                    lg: rem(48)
                },
                colors: {
                    'text-green': [
                        "#e5fef3",
                        "#d2fae7",
                        "#a8f3cf",
                        "#7aecb5",
                        "#54e69e",
                        "#3ce28f",
                        "#2de088",
                        "#1cc774",
                        "#0bb066",
                        "#009955"
                    ]}
            }}
        >
        <Box bg='black'>
        <Container size='xl' bg='black'>
            <Group
                pt='45'
                pb='60'
                justify="space-between"
            >
                <Box>
                    <Title c='text-green' ta='center'>Search</Title>
                    <Box bg='white' px='50' py='60' style={{
                        borderRadius: '20px'
                    }}>
                        <Text maw='200px' size='md'>
                            Search the huge database of games to find the next one to add to your collection!
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Title c='text-green' ta='center'>Save</Title>
                    <Box bg='white' px='50' py='60' style={{
                        borderRadius: '20px'
                    }}>
                        <Text maw='200px' size='md'>
                            Save the games you already own to your own collection to easily search and categorize them
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Title c='text-green' ta='center'>Wish</Title>
                    <Box bg='white' px='50' py='60' style={{
                        borderRadius: '20px'
                    }}>   
                        <Text maw='200px' size='md'>
                            Create a wishlist and send to your friends! Never worry about getting a duplicate gift again!
                        </Text>
                    </Box>
                </Box>
            </Group>
            </Container>
            </Box>
        </MantineProvider>
        </>
    )
}