import { NextResponse } from 'next/server'
import { getPostBySlug, updatePost } from '@/lib/redis-posts'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

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
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { title, tags, summary, content, cover } = await request.json()

    // 获取当前日期
    const date = new Date().toISOString().split('T')[0]

    // 更新文章
    await updatePost(slug, {
      title,
      date,
      tags,
      summary,
      content,
      cover: cover || '',
      readTime: '5 分钟阅读',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}
