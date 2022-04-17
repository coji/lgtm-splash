import {
  Box,
  Stack,
  HStack,
  Avatar,
  Text,
  Image,
  ScaleFade,
  BoxProps
} from '@chakra-ui/react'
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
    <Box
      role="group"
      position="relative"
      onClick={() => onClickPhoto(photo)}
      _hover={{
        cursor: 'pointer'
      }}
      {...rest}
    >
      <ScaleFade initialScale={0.5} in={true}>
        <Image
          mb="4"
          alt="image"
          objectFit="cover"
          loading="lazy"
          rounded="md"
          border="1px"
          borderColor="transparent"
          src={photo.urls.small}
          _groupHover={{
            boxShadow: 'md',
            border: '1px',
            borderColor: 'orange.500',
            cursor: 'pointer'
          }}
        />
      </ScaleFade>

      <HStack
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        p="2"
        fontSize="sm"
        color="white"
        bg="blackAlpha.500"
        border="1px"
        borderColor="transparent"
        roundedBottom="md"
        opacity="0"
        transition="all 0.5s"
        _groupHover={{
          opacity: '1'
        }}
      >
        <Avatar size="xs" src={photo.user.profile_image.medium}></Avatar>
        <Text>{photo.user.name}</Text>
      </HStack>
    </Box>
  )
}
