import { Text, Box, Link } from '@chakra-ui/react'
import { Photo } from '~/interfaces/model'
import { PhotoCard } from '~/features/search/components/PhotoCard'

interface SearchResultsProps {
  query?: string
  photos?: Photo[] | undefined
  onClickPhoto: (photo: Photo) => void
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  photos,
  onClickPhoto
}) => {
  if (!photos) return <></>

  return (
    <Box>
      <Text textAlign="right" fontSize="sm">
        Photos by{' '}
        <Link isExternal href="https://unsplash.com/">
          Unsplash
        </Link>
      </Text>

      {photos.length > 0 ? (
        <Box gap="4" style={{ columnCount: 3 }}>
          {photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onClickPhoto={onClickPhoto}
            />
          ))}
        </Box>
      ) : (
        <Box>no hit.</Box>
      )}
    </Box>
  )
}
