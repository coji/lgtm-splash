/* eslint-disable @next/next/no-head-element */
import React from 'react'
import ReactDOM from 'react-dom/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  ChakraProvider,
  Image,
  Box,
  Center,
  Heading,
  Text
} from '@chakra-ui/react'
import * as playwright from 'playwright-aws-lambda'
import { Post } from '~/interfaces/model'
import { firestore } from '~/libs/api-side/firebase-admin'

interface Props {
  post: Post
}
const Content: React.FC<Props> = ({ post }) => {
  return (
    <ChakraProvider>
      <Box position="relative">
        <Image
          w={`${post.width}px`}
          h={`${post.height}px`}
          rounded="md"
          alt="image"
          src={post.imageUrl}
        />
        <Center position="absolute" inset="0" color="white">
          <Box textAlign="center" fontFamily="serif">
            <Heading fontFamily="serif" fontSize="5xl" letterSpacing="wider">
              LGTM
            </Heading>
            <Text fontSize="sm">Looks good to me.</Text>
          </Box>
        </Center>
      </Box>
    </ChakraProvider>
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = String(req.query.id)

  // Posts の追加
  const ret = await firestore.collection('posts').doc(id).get()
  if (!ret.exists) return res.status(404).json({ message: 'Not found' })
  const post = ret.data() as Post

  // サイズの設定
  const viewport = { width: Number(post.width), height: Number(post.height) }

  // ブラウザインスタンスの生成
  const browser = await playwright.launchChromium()
  const page = await browser.newPage({ viewport })

  // HTMLの生成
  const markup = ReactDOM.renderToStaticMarkup(<Content post={post} />)
  const html = `<!doctype html>${markup}`

  // HTMLをセットして、ページの読み込み完了を待つ
  await page.setContent(html, { waitUntil: 'networkidle' })

  // スクリーンショットを取得する
  const image = await page.screenshot({ type: 'png' })
  await browser.close()

  // Vercel Edge Networkのキャッシュを利用するための設定
  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate')

  // Content Type を設定
  res.setHeader('Content-Type', 'image/jpg')

  // レスポンスを返す
  res.end(image)
}
