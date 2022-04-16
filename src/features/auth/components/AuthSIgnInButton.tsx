import { Button, ButtonProps } from '@chakra-ui/react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { useAuthAction } from '../hooks/useAuthAction'

interface Props extends ButtonProps {
  loginMethod: 'google' | 'github'
}
export const SignInButton: React.FC<Props> = ({ loginMethod, ...rest }) => {
  let icon = null
  const { signInWithGoogle, signInWithGithub } = useAuthAction()
  let loginFunction: null | (() => Promise<void>) = null
  switch (loginMethod) {
    case 'google':
      icon = <FaGoogle />
      loginFunction = signInWithGoogle
      break
    case 'github':
      icon = <FaGithub />
      loginFunction = signInWithGithub
  }

  return (
    <Button
      leftIcon={icon}
      onClick={() => loginFunction && loginFunction()}
      colorScheme="orange"
      {...rest}
    >
      Sign In
    </Button>
  )
}
