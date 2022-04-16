import type { NextApiRequest, NextApiResponse } from 'next'
import { createApi } from 'unsplash-js'

export type SearchResult = Awaited<ReturnType<typeof getPhotos>>

const getPhotos = async (
  unsplash: ReturnType<typeof createApi>,
  query: string
) => {
  const ret = await unsplash.search.getPhotos({ query })
  return ret.response?.results || []
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult>
) {
  const unsplash = createApi({
    accessKey: String(process.env.UNSPLASH_API_ACCESS_KEY)
  })

  res.status(200).json(await getPhotos(unsplash, String(req.query.q)))
}
