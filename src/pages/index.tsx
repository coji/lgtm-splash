import type { NextPage } from 'next'
import { Container, Box, Stack } from '@chakra-ui/react'
import { PhotoCard } from '~/features/search/components/PhotoCard'
import type { Photo } from '~/interfaces/model'
import { usePosts } from '~/features/posts/hooks/usePosts'
import { AppHeader } from '~/components/AppHeader'
import { AppFooter } from '~/components/AppFooter'
import { useUnsplashSearch } from '~/features/search/hooks/useUnsplashSearch'
import {
  SearchInput,
  SearchInputFormProps
} from '~/features/search/components/SearchInput'

const Home: NextPage = () => {
  const { searchQuery, setSearchQuery, data, isLoading } = useUnsplashSearch()
  const { mutate } = usePosts()

  const handleSearchSubmit = (values: SearchInputFormProps) => {
    setSearchQuery(values.query)
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

        <SearchInput onSubmit={handleSearchSubmit} isLoading={isLoading} />

        {data && (
          <Box>
            &quot;{searchQuery}&quot; Photos by Unsplash
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
