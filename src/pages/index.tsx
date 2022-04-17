import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Container,
  Link,
  Heading,
  Box,
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
  CircularProgress
} from '@chakra-ui/react'
import { useAuth } from '~/features/auth/hooks/useAuth'
import { useAuthAction } from '~/features/auth/hooks/useAuthAction'
import { SignInButton } from '~/features/auth/components/AuthSIgnInButton'
import { useUnsplashSearch } from '~/features/search/hooks/useUnsplashSearch'
import { PhotoCard } from '~/features/search/components/PhotoCard'
import type { Photo } from '~/interfaces/model'
import { usePosts } from '~/features/posts/hooks/usePosts'
interface SearchFormProps {
  query: string
}

const Home: NextPage = () => {
  const { currentUser, isAuthChecking } = useAuth()
  const { signOut } = useAuthAction()
  const { register, handleSubmit } = useForm<SearchFormProps>()
  const [query, setQuery] = useState<string>()
  const { data, isLoading } = useUnsplashSearch(query)
  const { mutate } = usePosts()

  const handleSearchSubmit = (values: SearchFormProps) => {
    setQuery(values.query)
  }

  const handleClickPhoto = (photo: Photo) => {
    console.log(photo)
    //  mutate({ imageUrl: photo.urls.thumb })
  }

  return (
    <Container
      display="flex"
      flexDirection="column"
      maxWidth="container.lg"
      minH="100vh"
    >
      <Stack flex="1">
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
            <Input
              id="query"
              type="search"
              placeholder="Search"
              autoFocus
              spellCheck={false}
              {...register('query')}
            />
            <Button type="submit" isLoading={isLoading}>
              Search
            </Button>
          </HStack>
        </form>

        {data && (
          <Box>
            &quot;{query}&quot; Photos by Unsplash
            {data.length > 0 ? (
              <Box gap="4" style={{ columnCount: 3 }}>
                {data.map((e) => (
                  <PhotoCard
                    key={e.id}
                    photo={e}
                    onClickPhoto={handleClickPhoto}
                  />
                ))}
              </Box>
            ) : (
              <div>hoge</div>
            )}
          </Box>
        )}
      </Stack>

      <Box p="4" textAlign="center">
        <Stack>
          <Box>
            Copyright &copy;{' '}
            <Link isExternal href="https://www.techtalk.jp/">
              TechTalk Inc.
            </Link>
          </Box>

          <Box>
            <Link isExternal href="https://www.github.com/coji/lgtm-splash">
              GitHub
            </Link>
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}

export default Home
