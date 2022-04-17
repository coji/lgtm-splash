import { Box, Image, ScaleFade, BoxProps } from '@chakra-ui/react'
import type { Photo } from '~/interfaces/model'
interface PhotoCardProps extends BoxProps {
  photo: Photo
  onClickPhoto: (photo: Photo) => void
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  onClickPhoto,
  ...rest
}) => {
  return (
    <Box onClick={() => onClickPhoto(photo)} {...rest}>
      <ScaleFade initialScale={0.5} in={true}>
        <Image
          mb="4"
          alt="image"
          objectFit="cover"
          loading="lazy"
          rounded="md"
          border="1px"
          borderColor="transparent"
          _hover={{
            boxShadow: 'md',
            border: '1px',
            borderColor: 'orange.500',
            cursor: 'pointer'
          }}
          src={photo.urls.small}
        />
      </ScaleFade>
    </Box>
  )
}
