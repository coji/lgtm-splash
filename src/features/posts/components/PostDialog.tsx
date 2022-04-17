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
  VStack,
  Heading,
  Text
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
        <ModalHeader>LGTM</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box position="relative">
            <Image w="full" rounded="md" alt="image" src={photo.urls.thumb} />
            <Center position="absolute" inset="0" color="white">
              <VStack textShadow="md">
                <Heading>LGTM</Heading>
                <Text>Looks good to me.</Text>
              </VStack>
            </Center>
          </Box>
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
