import type { SearchResult } from '~/pages/api/search'

export type Photo = SearchResult[0]

export interface Post {
  imageUrl: string
  width: string
  height: string
  uid: string
  createdAt: string
}
