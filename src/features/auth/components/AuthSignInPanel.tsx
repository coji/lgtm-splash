import { SignInButton } from './AuthSIgnInButton'
import { Box } from '@chakra-ui/react'

const LoginPanel: React.FC = () => {
  return (
    <Box>
      <SignInButton loginMethod="github" />
    </Box>
  )
}

export default LoginPanel
