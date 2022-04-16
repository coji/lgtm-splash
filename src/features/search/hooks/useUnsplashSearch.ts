import { useQuery } from 'react-query'
import ky from 'ky'
import type { SearchResult } from '~/pages/api/search'

export const useUnsplashSearch = (query: string | undefined) => {
  return useQuery(
    ['search', query],
    async () => {
      return await ky.get(`/api/search?q=${query}`).json<SearchResult>()
    },
    {
      enabled: !!query
    }
  )
}
