import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from './useAuth'

export const useRequireLogin = () => {
  const { currentUser, isAuthChecking } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthChecking && !currentUser && router.pathname !== '/signin') {
      router.push(`/signin?r=${router.asPath}`)
    }
  }, [router, currentUser, isAuthChecking])

  return {
    currentUser,
    isAuthChecking
  }
}
