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
  onClickGenerate: (photo: Photo) => void
  photo?: Photo
}
export const PostDialog: React.FC<PostDialogProps> = ({
  isOpen,
  onClose,
  onClickGenerate,
  photo
}) => {
  const handleClickGenerate = () => {
    if (photo) onClickGenerate(photo)
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
              <Image w="full" rounded="md" alt="image" src={photo.urls.thumb} />
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
