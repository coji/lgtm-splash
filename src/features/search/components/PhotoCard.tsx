import { Link, Image, AspectRatio } from '@chakra-ui/react'
import type { SearchResult } from '~/pages/api/search'

type Photo = SearchResult[0]

interface PhotoCardProps {
  photo: Photo
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <Link isExternal href={photo.links.html}>
      <AspectRatio w="200px" ratio={16 / 9}>
        <Image
          alt="image"
          rounded="md"
          objectFit="cover"
          src={photo.urls.small}
        />
      </AspectRatio>
    </Link>
  )
}
