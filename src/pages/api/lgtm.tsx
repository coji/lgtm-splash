/* eslint-disable @next/next/no-head-element */
import type { NextApiRequest, NextApiResponse } from 'next'
import ReactDOM from 'react-dom/server'
import * as playwright from 'playwright-aws-lambda'
import React from 'react'

const styles = `
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700&display=swap');
@font-face {
  font-family: 'NotoColorEmoji';
  src: url('https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf') format('truetype');
}

*:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *)) {
  all: unset;
  display: revert;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
ol,
ul {
  list-style: none;
}
img {
  max-width: 100%;
}
table {
  border-collapse: collapse;
}
textarea {
  white-space: revert;
}

html {
  padding: 0;
  margin: 0;
  height: 100%;
}

body {
  margin: 0;
  font-family: 'M PLUS Rounded 1c', 'NotoColorEmoji', 'sans-serif';
  height: 100%;
  display: grid;
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
  border: 20px solid #718096;
  position: relative;
}

`
interface Props {
  emoji: string
  title: string
  period: string
  industry: string
  scale: string
  position: string
}
const Content = (props: Props) => {
  return (
    <html>
      <head>
        <style>{styles}</style>
      </head>
      <body>
        <div className="meta">
          <div className="period">{props.period}</div>
          <div className="industry">{props.industry}</div>
          <div className="scale">{props.scale}</div>
          <div className="position">{props.position}</div>
        </div>
        <h1 className="title">
          <span className="emoji">{props.emoji}</span>
          {props.title}
        </h1>
        <div className="credit">Answer Board</div>
      </body>
    </html>
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // サイズの設定
  const viewport = { width: 1200, height: 630 }

  // ブラウザインスタンスの生成
  const browser = await playwright.launchChromium()
  const page = await browser.newPage({ viewport })

  // HTMLの生成
  const props = {
    emoji: req.query.emoji ? req.query.emoji.toString() : '',
    title: req.query.title ? req.query.title.toString() : 'no title',
    period: req.query.period ? req.query.period.toString() : '',
    industry: req.query.industry ? req.query.industry.toString() : '',
    scale: req.query.scale ? req.query.scale.toString() : '',
    position: req.query.position ? req.query.position.toString() : ''
  }
  const markup = ReactDOM.renderToStaticMarkup(<Content {...props} />)
  const html = `<!doctype html>${markup}`

  // HTMLをセットして、ページの読み込み完了を待つ
  await page.setContent(html, { waitUntil: 'networkidle' })

  // スクリーンショットを取得する
  const image = await page.screenshot({ type: 'png' })
  await browser.close()

  // Vercel Edge Networkのキャッシュを利用するための設定
  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate')

  // Content Type を設定
  res.setHeader('Content-Type', 'image/png')

  // レスポンスを返す
  res.end(image)
}
