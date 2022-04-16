import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Container,
  Heading,
  Box,
  Grid,
  GridItem,
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
import { useUnsplashSearch } from '~/features/search/hooks/useUnsplashSearch'
import { PhotoCard } from '~/features/search/components/PhotoCard'

interface SearchFormProps {
  query: string
}

const Home: NextPage = () => {
  const { currentUser, isAuthChecking } = useAuth()
  const { signOut } = useAuthAction()
  const { register, handleSubmit } = useForm<SearchFormProps>()
  const [query, setQuery] = useState<string>()
  const { data, isLoading, error } = useUnsplashSearch(query)

  const handleSearchSubmit = (values: SearchFormProps) => {
    setQuery(values.query)
  }

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

        <form onSubmit={handleSubmit(handleSearchSubmit)}>
          <HStack align="baseline">
            <Input id="query" placeholder="Search" {...register('query')} />
            <Button type="submit">Search</Button>
          </HStack>
        </form>

        <Grid templateColumns="repeat(4,1fr)" templateRows="masony" gap="4">
          {data &&
            data.map((e) => (
              <GridItem key={e.id}>
                <PhotoCard photo={e}></PhotoCard>
              </GridItem>
            ))}
        </Grid>
      </Stack>
    </Container>
  )
}

export default Home
