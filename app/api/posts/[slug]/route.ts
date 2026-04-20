import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/posts'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(post)
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { title, tags, summary, content, cover } = await request.json()
    const fs = require('fs')
    const path = require('path')

    // 获取当前日期
    const date = new Date().toISOString().split('T')[0]

    // 生成 Markdown 文件内容
    const markdown = `---
title: "${title}"
date: "${date}"
tags: [${tags.map((t: string) => `"${t}"`).join(', ')}]
summary: "${summary}"
cover: "${cover}"
readTime: "5 分钟阅读"
---

${content}
`

    // 更新文件
    const postsDir = path.join(process.cwd(), 'posts')
    const filePath = path.join(postsDir, `${params.slug}.md`)

    fs.writeFileSync(filePath, markdown, 'utf8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}
