import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import BackToTop from '@/components/BackToTop'
import { getPostBySlug, markdownToHtml } from '@/lib/redis-posts'
import 'highlight.js/styles/atom-one-light.css'

// 强制动态渲染
export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

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
              {/* 返回按钮 */}
              <Link
                href="/#articles"
                className="pixel-btn pixel-btn-primary"
                style={{
                  display: 'inline-block',
                  marginBottom: '2rem',
                  padding: '0.75rem 2rem',
                  fontSize: '12px',
                  textDecoration: 'none'
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
                      padding: '4px 10px',
                      fontSize: '13px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      borderRadius: '3px',
                      backgroundColor: 'rgba(217, 119, 87, 0.12)',
                      color: '#d97757',
                      border: '1px solid rgba(217, 119, 87, 0.3)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 像素装饰 - 标题上方 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <span style={{ color: '#d97757', fontSize: '1.5rem' }}>▸</span>
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: 'linear-gradient(to right, #d97757, transparent)'
                }} />
              </div>

              {/* 标题 */}
              <h1 style={{
                fontSize: 'clamp(2rem, 3vw, 3rem)',
                marginBottom: '1rem',
                lineHeight: 1.2,
                fontFamily: "'Ark Pixel', monospace"
              }}>
                {post.title}
              </h1>

              {/* 元信息 */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                color: '#5a5a5a',
                fontSize: '14px',
                marginBottom: '2rem',
                fontFamily: "'Ark Pixel', monospace"
              }}>
                <span>{post.date}</span>
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
                color: '#2d2d2d',
                fontSize: '1.125rem'
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* 文章底部 */}
            <footer style={{
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '3px solid #d97757'
            }}>
              {/* 像素装饰 - 底部 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: 'linear-gradient(to right, transparent, #d97757)'
                }} />
                <span style={{ color: '#d97757', fontSize: '1.5rem' }}>◂</span>
              </div>

              <Link
                href="/#articles"
                className="pixel-btn pixel-btn-primary"
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '12px',
                  textDecoration: 'none'
                }}
              >
                ← 返回首页
              </Link>
            </footer>
          </div>
        </article>

        {/* 返回顶部按钮 */}
        <BackToTop />
      </main>
    </>
  )
}
