import { useState } from 'react'
import { useQuery } from 'react-query'
import ky from 'ky'
import type { SearchResult } from '~/pages/api/search'

export const useUnsplashSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>()
  const query = useQuery(
    ['search', searchQuery],
    async () => {
      return await ky.get(`/api/search?q=${searchQuery}`).json<SearchResult>()
    },
    {
      enabled: !!searchQuery
    }
  )
  return {
    searchQuery,
    setSearchQuery,
    ...query
  }
}
