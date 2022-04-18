import type { NextPage } from 'next'
import { useState } from 'react'
import { Container, Stack, useDisclosure } from '@chakra-ui/react'
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
import { PostDialog } from '~/features/posts/components/PostDialog'

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

  const [selectedPhoto, setSelectedPhoto] = useState<Photo>()
  const addPostDialog = useDisclosure()
  const handleClickPhoto = (photo: Photo) => {
    setSelectedPhoto(photo)
    addPostDialog.onOpen()
    //  mutate({ imageUrl: photo.urls.thumb })
  }

  const handleClickGenerate = (photo: Photo, width: string, height: string) => {
    mutate({ imageUrl: photo.urls.thumb, width, height })
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

        <PostDialog
          isOpen={addPostDialog.isOpen}
          onClose={addPostDialog.onClose}
          onClickGenerate={handleClickGenerate}
          photo={selectedPhoto}
        ></PostDialog>
      </Stack>

      <AppFooter />
    </Container>
  )
}

export default Home
