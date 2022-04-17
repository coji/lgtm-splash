import {
  HStack,
  Heading,
  Text,
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  CircularProgress
} from '@chakra-ui/react'
import { useAuth } from '~/features/auth/hooks/useAuth'
import { useAuthAction } from '~/features/auth/hooks/useAuthAction'
import { SignInButton } from '~/features/auth/components/AuthSignInButton'

export const AppHeader: React.FC = () => {
  const { currentUser, isAuthChecking } = useAuth()
  const { signOut } = useAuthAction()

  return (
    <HStack spacing="4" py="2">
      <Heading
        flex="1"
        color="orange.400"
        fontSize="4xl"
        fontWeight="extrabold"
        fontStyle="italic"
      >
        LGTM Splash
      </Heading>

      {currentUser ? (
        <Menu>
          <MenuButton
            as={Avatar}
            boxSize="10"
            name={currentUser.displayName || undefined}
            src={currentUser.photoURL}
            _hover={{ cursor: 'pointer' }}
          ></MenuButton>
          <MenuList>
            <MenuItem>
              <Box>
                <Text>{currentUser.displayName}</Text>
                <Text fontSize="xs">{currentUser.email}</Text>
              </Box>
            </MenuItem>
            <MenuItem onClick={() => signOut()}>SignOut</MenuItem>
          </MenuList>
        </Menu>
      ) : isAuthChecking ? (
        <CircularProgress isIndeterminate color="orange.300" size="10" />
      ) : (
        <SignInButton loginMethod="github" />
      )}
    </HStack>
  )
}
