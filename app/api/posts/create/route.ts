import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { title, tags, summary, content, cover } = await request.json()

    // 生成文件名（使用标题的拼音或英文）
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .trim()

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

    // 保存文件
    const postsDir = path.join(process.cwd(), 'posts')
    const filePath = path.join(postsDir, `${slug}.md`)

    fs.writeFileSync(filePath, markdown, 'utf8')

    return NextResponse.json({ success: true, slug })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
