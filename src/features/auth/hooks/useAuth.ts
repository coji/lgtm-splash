import { auth } from '~/libs/firebase'
import { useAuthUser } from '@react-query-firebase/auth'

export const useAuth = () => {
  const currentUser = useAuthUser(['user'], auth, {})
  return {
    currentUser: currentUser.data,
    isAuthChecking: currentUser.isLoading
  }
}
