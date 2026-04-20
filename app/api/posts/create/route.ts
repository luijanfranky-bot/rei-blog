import { NextResponse } from 'next/server'
import { createPost } from '@/lib/redis-posts'

export async function POST(request: Request) {
  try {
    const { title, tags, summary, content, cover } = await request.json()

    // 获取当前日期
    const date = new Date().toISOString().split('T')[0]

    // 创建文章
    const slug = await createPost({
      title,
      date,
      tags,
      summary,
      content,
      cover: cover || '',
      readTime: '5 分钟阅读',
    })

    return NextResponse.json({ success: true, slug })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
