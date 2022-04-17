import { Box, Image, ScaleFade, BoxProps } from '@chakra-ui/react'
import type { Photo } from '../interfaces/photo'
interface PhotoCardProps extends BoxProps {
  photo: Photo
  onPostPhoto: (imageUrl: string) => void
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  onPostPhoto,
  ...rest
}) => {
  return (
    <Box onClick={() => onPostPhoto(photo.urls.small)} {...rest}>
      <ScaleFade initialScale={0.5} in={true}>
        <Image
          mb="4"
          alt="image"
          objectFit="cover"
          rounded="md"
          src={photo.urls.small}
        />
      </ScaleFade>
    </Box>
  )
}
