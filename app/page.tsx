import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import TypewriterTitle from '@/components/TypewriterTitle'
import PixelMarquee from '@/components/PixelMarquee'
import Pagination from '@/components/Pagination'
import { getPaginatedPosts } from '@/lib/redis-posts'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const { posts, totalPages } = await getPaginatedPosts(currentPage)

  return (
    <>
      <Navigation />

      <main>
        {/* Hero 区域 */}
        <section style={{ padding: 'clamp(5rem, 4vw + 2vw, 7rem) 0' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 0.6fr',
              gap: '5rem',
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {/* 文字内容 - 左侧 */}
              <div style={{ paddingRight: '2rem' }}>
                <TypewriterTitle />
                <p style={{
                  fontSize: 'clamp(0.9rem, 0.95vw, 1.05rem)',
                  color: '#6a6a6a',
                  marginBottom: '3rem',
                  marginTop: '2rem',
                  lineHeight: 2,
                  letterSpacing: '0.3em',
                  fontFamily: "'Ark Pixel', monospace"
                }}>
                  代码 / 思考 / 记录
                </p>
                <div className="flex gap--4" style={{ display: 'flex', gap: '1.25rem' }}>
                  <a href="#articles" className="pixel-btn pixel-btn-primary">
                    进入
                  </a>
                  <button className="pixel-btn pixel-btn-secondary">
                    关于
                  </button>
                </div>
              </div>

              {/* 角色图片 - 右侧 */}
              <div
                className="hero-image-container"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <Image
                  src="/rei-new.png"
                  alt="Rei"
                  width={400}
                  height={400}
                  className="pixel-art hero-image"
                  style={{ display: 'block' }}
                />
                <Image
                  src="/question-mark.png"
                  alt="question mark"
                  width={70}
                  height={70}
                  className="pixel-art speech-bubble"
                  style={{
                    position: 'absolute',
                    top: '40px',
                    right: '95px',
                    opacity: 0,
                    transform: 'scale(0) rotate(5deg)',
                    transition: 'opacity 0.2s ease 0.3s, transform 0.2s ease 0.3s',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 像素滚动分隔条 */}
        <PixelMarquee />

        {/* 最新文章 - 3:7 分栏布局 */}
        <section id="articles" style={{ padding: 'clamp(3rem, 2.39vw + 2.61vw, 5rem) 0' }}>
          <div className="container">
            <h2 className="text--center mb--8" style={{
              fontSize: 'clamp(1.75rem, 1.67vw + 0.33vw, 2rem)',
              fontFamily: "'Ark Pixel', monospace",
              letterSpacing: '0.05em'
            }}>
              最新文章
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '3fr 7fr',
              gap: '3rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {/* 左侧栏：个人信息 */}
              <aside style={{
                position: 'sticky',
                top: 'calc(4.25rem + 1.5rem)',
                height: 'fit-content'
              }}>
                <div style={{
                  backgroundColor: 'rgb(227, 218, 204)',
                  border: '2px solid rgba(45, 45, 45, 0.1)',
                  borderRadius: '4px',
                  padding: '2.5rem',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(45, 45, 45, 0.06)'
                }}>
                  <Image
                    src="/avatar-new.jpg"
                    alt="Taiyan.Huang"
                    width={120}
                    height={120}
                    className="pixel-art"
                    style={{
                      borderRadius: '2px',
                      margin: '0 auto 2rem',
                      display: 'block',
                      border: '2px solid rgba(45, 45, 45, 0.1)'
                    }}
                  />

                  <h3 style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '18px',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem'
                  }}>
                    Eric
                  </h3>

                  <p style={{
                    color: '#5a5a5a',
                    fontSize: '0.95rem',
                    lineHeight: 1.8,
                    marginBottom: '2rem',
                    fontFamily: "'Ark Pixel', monospace"
                  }}>
                    热爱技术与设计的开发者<br />
                    记录学习与生活的点滴<br />
                    分享代码、思考与创意
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    marginBottom: '2rem',
                    padding: '1.5rem 0',
                    borderTop: '1px solid rgba(45, 45, 45, 0.08)',
                    borderBottom: '1px solid rgba(45, 45, 45, 0.08)'
                  }}>
                    <div>
                      <div style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '20px',
                        color: '#d97757',
                        marginBottom: '0.5rem'
                      }}>
                        {posts.length}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#8a8a8a',
                        fontFamily: "'Ark Pixel', monospace"
                      }}>
                        文章
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '20px',
                        color: '#d97757',
                        marginBottom: '0.5rem'
                      }}>
                        {Array.from(new Set(posts.flatMap(p => p.tags))).length}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#8a8a8a',
                        fontFamily: "'Ark Pixel', monospace"
                      }}>
                        标签
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    alignItems: 'flex-start'
                  }}>
                    <a href="#" style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.05em',
                      color: '#5a5a5a',
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}>
                      Email
                    </a>
                    <a href="#" style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.05em',
                      color: '#5a5a5a',
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}>
                      GitHub
                    </a>
                    <a href="#" style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.05em',
                      color: '#5a5a5a',
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}>
                      Twitter
                    </a>
                  </div>
                </div>
              </aside>

              {/* 右侧栏：文章列表 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
              }}>
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <article
                      className="article-card"
                      style={{
                        backgroundColor: 'rgb(227, 218, 204)',
                        border: '2px solid rgba(45, 45, 45, 0.1)',
                        borderRadius: '4px',
                        padding: '2rem',
                        display: 'grid',
                        gridTemplateColumns: '1fr 340px',
                        gap: '2rem',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 8px rgba(45, 45, 45, 0.06)',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <h3 style={{
                            fontSize: 'clamp(1.5rem, 1.5vw + 0.5rem, 2rem)',
                            marginBottom: '1rem',
                            lineHeight: 1.3,
                            color: '#2d2d2d',
                            fontFamily: "'Ark Pixel', monospace"
                          }}>
                            {post.title}
                          </h3>

                          <p style={{
                            color: '#5a5a5a',
                            fontSize: '1.05rem',
                            lineHeight: 1.7,
                            marginBottom: '1.5rem'
                          }}>
                            {post.summary}
                          </p>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          flexWrap: 'wrap'
                        }}>
                          <div style={{
                            fontFamily: "'Ark Pixel', monospace",
                            fontSize: '12px',
                            color: '#8a8a8a',
                            letterSpacing: '0.05em'
                          }}>
                            <span>{post.date}</span>
                          </div>
                          <div className="flex gap--2" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
                                  border: '1px solid rgba(217, 119, 87, 0.3)',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div style={{
                        borderRadius: '4px',
                        overflow: 'hidden',
                        border: '1px solid rgba(45, 45, 45, 0.08)',
                        position: 'relative',
                        minHeight: '200px',
                        backgroundColor: 'rgba(45, 45, 45, 0.02)'
                      }}>
                        {post.cover && (post.cover.startsWith('http://') || post.cover.startsWith('https://')) && (
                          <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="pixel-art"
                          />
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            {/* 分页导航 */}
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer style={{
        backgroundColor: 'rgb(227, 218, 204)',
        padding: '3rem 0 2rem',
        marginTop: '4rem'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>关于</h3>
              <p className="text--small" style={{ color: '#5a5a5a' }}>
                一个专注于技术与设计的个人博客，分享编程经验和生活感悟。
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>快速链接</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="/" style={{ color: '#5a5a5a', textDecoration: 'none' }}>首页</Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="#" style={{ color: '#5a5a5a', textDecoration: 'none' }}>文章归档</Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="#" style={{ color: '#5a5a5a', textDecoration: 'none' }}>标签</Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link href="#" style={{ color: '#5a5a5a', textDecoration: 'none' }}>关于我</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>联系方式</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#5a5a5a', textDecoration: 'none' }}>GitHub</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#5a5a5a', textDecoration: 'none' }}>Twitter</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#5a5a5a', textDecoration: 'none' }}>Email</a>
                </li>
              </ul>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgb(217, 208, 194)',
            paddingTop: '2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <p style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '10px',
              color: '#8a8a8a',
              letterSpacing: '0.08em'
            }}>
              &copy; 2026 REI&apos;S WORLD
            </p>
            <p style={{
              fontFamily: "'Ark Pixel', monospace",
              fontSize: '0.8rem',
              color: '#aaa',
              letterSpacing: '0.2em'
            }}>
              用代码记录生活 · 用文字留住思考
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
