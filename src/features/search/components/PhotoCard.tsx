import { Image } from '@chakra-ui/react'
import type { SearchResult } from '~/pages/api/search'

type Photo = SearchResult[0]

interface PhotoCardProps {
  photo: Photo
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <Image alt="image" rounded="md" objectFit="cover" src={photo.urls.small} />
  )
}
