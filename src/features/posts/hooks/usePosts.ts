import ky from 'ky'
import { useAuth } from '~/features/auth/hooks/useAuth'
import { useMutation } from 'react-query'
import { Post } from '../interfaces/posts'

export const usePosts = () => {
  const { currentUser } = useAuth()

  const mutation = useMutation(async (post: Post) => {
    if (!currentUser) return
    const token = await currentUser.getIdToken()
    return ky.post('/api/post', {
      headers: {
        authorization: `Bearer ${token}`
      },
      json: {
        post
      }
    })
  })

  return { ...mutation }
}
