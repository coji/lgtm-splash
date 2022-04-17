import type { NextPage } from 'next'
import { Container, Box, Stack } from '@chakra-ui/react'
import type { Photo } from '~/interfaces/model'
import { usePosts } from '~/features/posts/hooks/usePosts'
import { AppHeader } from '~/components/AppHeader'
import { AppFooter } from '~/components/AppFooter'
import { useUnsplashSearch } from '~/features/search/hooks/useUnsplashSearch'
import {
  SearchInput,
  SearchInputFormProps
} from '~/features/search/components/SearchInput'
import { SearchResults } from '~/features/search/components/SearchResults'

const Home: NextPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    data: searchResults,
    isLoading
  } = useUnsplashSearch()
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
        <SearchResults
          query={searchQuery}
          photos={searchResults}
          onClickPhoto={handleClickPhoto}
        />
      </Stack>

      <AppFooter />
    </Container>
  )
}

export default Home
