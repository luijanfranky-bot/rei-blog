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
  createdAt: string  // ISO 8601 格式，文章创建时间，不可变
  updatedAt: string  // ISO 8601 格式，最后编辑时间
}

// 分页配置
export const POSTS_PER_PAGE = 5

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

    // 过滤掉 null 值并按创建时间降序排序（最新的在前）
    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

// 获取分页文章
export async function getPaginatedPosts(page: number = 1): Promise<{
  posts: Post[]
  totalPages: number
  currentPage: number
  totalPosts: number
}> {
  try {
    const allPosts = await getAllPosts()
    const totalPosts = allPosts.length
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
    const currentPage = Math.max(1, Math.min(page, totalPages))

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    const posts = allPosts.slice(startIndex, endIndex)

    return {
      posts,
      totalPages,
      currentPage,
      totalPosts
    }
  } catch (error) {
    console.error('Error getting paginated posts:', error)
    return {
      posts: [],
      totalPages: 0,
      currentPage: 1,
      totalPosts: 0
    }
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
export async function createPost(post: Omit<Post, 'slug' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    // 生成 slug - 先尝试从标题生成
    let slug = post.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .trim()

    // 如果 slug 为空（比如纯中文标题），使用时间戳
    if (!slug) {
      slug = `post-${Date.now()}`
    }

    const now = new Date().toISOString()
    const fullPost: Post = {
      ...post,
      slug,
      createdAt: now,
      updatedAt: now,
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
export async function updatePost(slug: string, post: Omit<Post, 'slug' | 'createdAt' | 'updatedAt'>): Promise<void> {
  try {
    // 获取原文章以保留 createdAt
    const existingPost = await getPostBySlug(slug)

    const fullPost: Post = {
      ...post,
      slug,
      createdAt: existingPost?.createdAt || new Date().toISOString(), // 保留原创建时间
      updatedAt: new Date().toISOString(), // 更新编辑时间
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
