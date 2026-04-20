import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { getPostBySlug, markdownToHtml, getAllPosts } from '@/lib/posts'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = await markdownToHtml(post.content)

  return (
    <>
      <Navigation />

      <main>
        <article style={{ padding: 'clamp(3rem, 2.39vw + 2.61vw, 5rem) 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            {/* 文章头部 */}
            <header style={{ marginBottom: '3rem' }}>
              {/* 返回链接 */}
              <Link
                href="/#articles"
                style={{
                  display: 'inline-block',
                  marginBottom: '2rem',
                  color: '#5a5a5a',
                  textDecoration: 'none',
                  borderBottom: '3px solid currentColor',
                  paddingBottom: '2px'
                }}
              >
                ← 返回首页
              </Link>

              {/* 标签 */}
              <div className="flex gap--2 mb--4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '6px 12px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      lineHeight: 1,
                      borderRadius: '6px',
                      backgroundColor: 'rgba(217, 119, 87, 0.1)',
                      color: '#d97757',
                      border: 'none'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 标题 */}
              <h1 style={{
                fontSize: 'clamp(2rem, 3vw, 3rem)',
                marginBottom: '1rem',
                lineHeight: 1.2
              }}>
                {post.title}
              </h1>

              {/* 元信息 */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                color: '#5a5a5a',
                fontSize: '1rem',
                marginBottom: '2rem'
              }}>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
                <span>·</span>
                <span>作者：Rei</span>
              </div>

              {/* 分隔线 */}
              <hr style={{
                border: 'none',
                borderTop: '1px solid rgb(227, 218, 204)',
                margin: '2rem 0'
              }} />
            </header>

            {/* 文章内容 */}
            <div
              className="article-content"
              style={{
                lineHeight: 1.8,
                color: '#2d2d2d'
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* 文章底部 */}
            <footer style={{
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgb(227, 218, 204)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Link
                  href="/#articles"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.75rem 2rem',
                    backgroundColor: 'transparent',
                    color: '#2d2d2d',
                    border: '1px solid rgba(45, 45, 45, 0.1)',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '12px'
                  }}
                >
                  返回首页
                </Link>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{
                    color: '#5a5a5a',
                    fontSize: '1rem'
                  }}>
                    分享到：
                  </span>
                  <a href="#" style={{ color: '#d97757' }}>Twitter</a>
                  <a href="#" style={{ color: '#d97757' }}>微博</a>
                </div>
              </div>
            </footer>
          </div>
        </article>
      </main>
    </>
  )
}
