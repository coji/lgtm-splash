import type { NextPage } from 'next'
import {
  Container,
  Heading,
  Box,
  Flex,
  Avatar,
  Stack,
  HStack,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  CircularProgress,
} from '@chakra-ui/react'
import { useAuth } from '~/features/auth/hooks/useAuth'
import { useAuthAction } from '~/features/auth/hooks/useAuthAction'
import { SignInButton } from '~/features/auth/components/AuthSIgnInButton'

const Home: NextPage = () => {
  const { currentUser, isAuthChecking } = useAuth()
  const { signOut } = useAuthAction()

  return (
    <Container maxWidth="container.lg" minH="100vh">
      <Stack>
        <HStack spacing="4" py="2">
          <Heading
            flex="1"
            bgGradient="linear(to-r, #ffa000, #ff0000)"
            bgClip="text"
            fontSize="4xl"
            fontWeight="extrabold"
            fontStyle="italic"
          >
            LGTM Splash
          </Heading>

          {currentUser ? (
            <Menu>
              <MenuButton
                as={Avatar}
                boxSize="10"
                name={currentUser.displayName || currentUser.email || undefined}
                src={currentUser.photoURL || undefined}
                _hover={{ cursor: 'pointer' }}
              ></MenuButton>
              <MenuList>
                <MenuItem>
                  <Box>
                    <Text>{currentUser.displayName}</Text>
                    <Text fontSize="xs">{currentUser.email}</Text>
                  </Box>
                </MenuItem>
                <MenuItem onClick={() => signOut()}>SignOut</MenuItem>
              </MenuList>
            </Menu>
          ) : isAuthChecking ? (
            <CircularProgress isIndeterminate color="orange.300" size="10" />
          ) : (
            <SignInButton loginMethod="github" />
          )}
        </HStack>

        <HStack align="baseline">
          <Input id="search" placeholder="Search" />
          <Button>Search</Button>
        </HStack>

        <Flex>hogehoge</Flex>
      </Stack>
    </Container>
  )
}

export default Home
