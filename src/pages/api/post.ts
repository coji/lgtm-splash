import type { NextApiRequest, NextApiResponse } from 'next'
import { getIdTokenFromReq } from '~/libs/api-side/auth-helper'
import type { Post } from '~/interfaces/model'
import { PostConverter } from '~/libs/api-side/firestore-converter'
import { firebase, firestore } from '~/libs/api-side/firebase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | string>
) {
  if (req.method !== 'POST')
    return res.status(500).send("it's should be a POST method")

  // 認証
  const verified = await getIdTokenFromReq(req)
  if (!verified) return res.status(500).send('authorization failure')

  // Posts の追加
  const ret = await firestore.collection('posts').add({
    email: verified.email,
    uid: verified.uid,
    imageUrl: req.body.post.imageUrl,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })

  const addedPost = await ret.withConverter(PostConverter).get()
  res.status(200).json(addedPost.data() || 'error')
}
