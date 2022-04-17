import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Box, Stack, HStack, Input, Button } from '@chakra-ui/react'
import { useUnsplashSearch } from '~/features/search/hooks/useUnsplashSearch'
import { PhotoCard } from '~/features/search/components/PhotoCard'
import type { Photo } from '~/interfaces/model'
import { usePosts } from '~/features/posts/hooks/usePosts'
import { AppHeader } from '~/components/AppHeader'
import { AppFooter } from '~/components/AppFooter'

interface SearchFormProps {
  query: string
}

const Home: NextPage = () => {
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
        <AppHeader />

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

      <AppFooter />
    </Container>
  )
}

export default Home
