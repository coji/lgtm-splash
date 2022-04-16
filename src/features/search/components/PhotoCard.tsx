import { Link, Box, Image, AspectRatio } from '@chakra-ui/react'
import type { SearchResult } from '~/pages/api/search'

type Photo = SearchResult[0]

interface PhotoCardProps {
  photo: Photo
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <Link isExternal href={photo.links.html}>
      <Image
        mb="4"
        alt="image"
        objectFit="cover"
        rounded="md"
        src={photo.urls.small}
      />
    </Link>
  )
}
