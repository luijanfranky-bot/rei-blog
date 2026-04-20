import { Redis } from '@upstash/redis'

// 初始化 Redis 客户端
const redis = Redis.fromEnv()

export interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  cover: string
  readTime: string
  content: string
}

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  try {
    // 获取所有文章的 slug
    const slugs = await redis.smembers('posts:slugs') as string[]

    if (!slugs || slugs.length === 0) {
      return []
    }

    // 获取所有文章数据
    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const post = await redis.get(`post:${slug}`) as Post | null
        return post
      })
    )

    // 过滤掉 null 值并按日期排序
    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

// 根据 slug 获取单篇文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await redis.get(`post:${slug}`) as Post | null
    return post
  } catch (error) {
    console.error('Error getting post by slug:', error)
    return null
  }
}

// 创建新文章
export async function createPost(post: Omit<Post, 'slug'>): Promise<string> {
  try {
    // 生成 slug
    const slug = post.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .trim()

    const fullPost: Post = {
      ...post,
      slug,
    }

    // 保存文章
    await redis.set(`post:${slug}`, fullPost)

    // 添加 slug 到集合
    await redis.sadd('posts:slugs', slug)

    return slug
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

// 更新文章
export async function updatePost(slug: string, post: Omit<Post, 'slug'>): Promise<void> {
  try {
    const fullPost: Post = {
      ...post,
      slug,
    }

    await redis.set(`post:${slug}`, fullPost)
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

// 删除文章
export async function deletePost(slug: string): Promise<void> {
  try {
    await redis.del(`post:${slug}`)
    await redis.srem('posts:slugs', slug)
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}

// Markdown 转 HTML（保持原有功能）
export async function markdownToHtml(markdown: string): Promise<string> {
  const { marked } = await import('marked')
  const result = await marked(markdown)
  return result
}
