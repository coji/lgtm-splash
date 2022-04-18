import { useRef } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Image,
  Spacer,
  Center,
  Stack,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  Link
} from '@chakra-ui/react'
import type { Photo } from '~/interfaces/model'

interface PostDialogProps {
  isOpen: boolean
  onClose: () => void
  onClickGenerate: (photo: Photo, width: string, height: string) => void
  photo?: Photo
}
export const PostDialog: React.FC<PostDialogProps> = ({
  isOpen,
  onClose,
  onClickGenerate,
  photo
}) => {
  const imageRef = useRef<HTMLImageElement>(null!)

  const handleClickGenerate = () => {
    if (photo)
      onClickGenerate(
        photo,
        imageRef.current.width.toString(),
        imageRef.current.height.toString()
      )
    onClose()
  }

  if (!photo) return <></>
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>LGTM Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Box position="relative">
              <Image
                ref={imageRef}
                mx="auto"
                w="400px"
                rounded="md"
                alt="image"
                src={photo.urls.regular}
              />
              <Center position="absolute" inset="0" color="white">
                <Box textAlign="center" fontFamily="serif">
                  <Heading
                    fontFamily="serif"
                    fontSize="5xl"
                    letterSpacing="wider"
                  >
                    LGTM
                  </Heading>
                  <Text fontSize="sm">Looks good to me.</Text>
                </Box>
              </Center>
            </Box>

            <Link
              isExternal
              href={`${photo.user.links.html}?utm_source=lgtm-splash&utm_medium=referral`}
            >
              <HStack fontSize="sm">
                <Avatar size="xs" src={photo.user.profile_image.medium} />
                <Text>{photo.user.name}</Text>
              </HStack>
            </Link>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose} variant="ghost">
            Close
          </Button>
          <Spacer />
          <Button colorScheme="orange" onClick={() => handleClickGenerate()}>
            Generate
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
