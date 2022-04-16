import { Box, Image } from '@chakra-ui/react'
import type { SearchResult } from '~/pages/api/search'
import type { Photo } from '../interfaces/photo'
interface PhotoCardProps {
  photo: Photo
  onPostPhoto: (imageUrl: string) => void
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onPostPhoto }) => {
  return (
    <Box onClick={() => onPostPhoto(photo.urls.small)}>
      <Image
        mb="4"
        alt="image"
        objectFit="cover"
        rounded="md"
        src={photo.urls.small}
      />
    </Box>
  )
}
