import { Button, ButtonProps } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { useAuthAction } from '../hooks/useAuthAction'

interface Props extends ButtonProps {
  loginMethod: 'github'
}
export const SignInButton: React.FC<Props> = ({ loginMethod, ...rest }) => {
  let icon = null
  const { signInWithGithub } = useAuthAction()
  let loginFunction: null | (() => Promise<void>) = null
  switch (loginMethod) {
    case 'github':
      icon = <FaGithub />
      loginFunction = signInWithGithub
      break
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
