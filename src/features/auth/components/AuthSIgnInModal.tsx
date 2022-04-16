import AuthLoginPanel from './AuthSignInPanel'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps
} from '@chakra-ui/react'

export const SignInModal: React.FC<UseModalProps> = (props) => {
  return (
    <Modal autoFocus={false} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">ログイン</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <AuthLoginPanel />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
