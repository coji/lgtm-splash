import { auth } from '~/libs/firebase'
import {
  useAuthSignInWithRedirect,
  useAuthSignOut,
} from '@react-query-firebase/auth'
import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth'

export const useAuthAction = () => {
  const authSignIn = useAuthSignInWithRedirect(auth)
  const authSignOut = useAuthSignOut(auth)

  const signInWithGithub = async () => {
    const provider = new OAuthProvider('github.com')
    return authSignIn.mutate({
      provider,
    })
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    return authSignIn.mutate({
      provider,
    })
  }

  const signOut = () => authSignOut.mutate()

  return {
    signInWithGoogle,
    signInWithGithub,
    signOut,
  }
}
