import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { getAllPosts } from '@/lib/redis-posts'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <>
      <Navigation />

      <main>
        {/* Hero 区域 */}
        <section style={{ padding: 'clamp(3rem, 2.39vw + 2.61vw, 5rem) 0' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'center',
              maxWidth: '1100px',
              margin: '0 auto'
            }}>
              {/* 文字内容 - 左侧 */}
              <div style={{ paddingRight: '2rem' }}>
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 3vw, 3.5rem)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.2
                }}>
                  欢迎来到我的博客
                </h1>
                <p style={{
                  fontSize: 'clamp(1.375rem, 1.34vw + 0.16vw, 1.5rem)',
                  color: '#5a5a5a',
                  marginBottom: '2.5rem',
                  lineHeight: 1.7
                }}>
                  一个优雅的复古风格博客，记录技术与生活
                </p>
                <div className="flex gap--4">
                  <a href="#articles" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.75rem 2rem',
                    backgroundColor: '#d97757',
                    color: '#faf8f5',
                    border: '1px solid #d97757',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '12px'
                  }}>
                    开始阅读
                  </a>
                  <button style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.75rem 2rem',
                    backgroundColor: 'transparent',
                    color: '#2d2d2d',
                    border: '1px solid rgba(45, 45, 45, 0.1)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '12px'
                  }}>
                    了解更多
                  </button>
                </div>
              </div>

              {/* 角色图片 - 右侧 */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image
                  src="/rei-hero.png"
                  alt="Rei"
                  width={400}
                  height={400}
                  className="pixel-art"
                  style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 最新文章 - 3:7 分栏布局 */}
        <section id="articles" style={{ padding: 'clamp(3rem, 2.39vw + 2.61vw, 5rem) 0' }}>
          <div className="container">
            <h2 className="text--center mb--8" style={{ fontSize: 'clamp(1.75rem, 1.67vw + 0.33vw, 2rem)' }}>
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
                  border: '1px solid rgb(227, 218, 204)',
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(45, 45, 45, 0.04)'
                }}>
                  <Image
                    src="/logo-avatar.png"
                    alt="Rei"
                    width={120}
                    height={120}
                    className="pixel-art"
                    style={{
                      borderRadius: '50%',
                      margin: '0 auto 1.5rem',
                      display: 'block',
                      border: '3px solid #d97757'
                    }}
                  />

                  <h3 style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '18px',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem'
                  }}>
                    Rei
                  </h3>

                  <p style={{
                    color: '#5a5a5a',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    热爱技术与设计的开发者<br />
                    记录学习与生活的点滴
                  </p>

                  <hr style={{
                    border: 'none',
                    borderTop: '1px solid rgb(227, 218, 204)',
                    margin: '1.5rem 0'
                  }} />

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
                  <article
                    key={post.slug}
                    style={{
                      backgroundColor: 'rgb(227, 218, 204)',
                      border: '1px solid rgb(227, 218, 204)',
                      borderRadius: '12px',
                      padding: '2rem',
                      display: 'grid',
                      gridTemplateColumns: '1fr 200px',
                      gap: '2rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 1px 3px rgba(45, 45, 45, 0.04)'
                    }}
                  >
                    <div>
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
                              border: 'none',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 style={{
                        fontSize: 'clamp(1.25rem, 1.17vw + 0.33vw, 1.5rem)',
                        marginBottom: '0.75rem',
                        lineHeight: 1.3
                      }}>
                        <Link
                          href={`/posts/${post.slug}`}
                          style={{ color: '#2d2d2d', textDecoration: 'none' }}
                        >
                          {post.title}
                        </Link>
                      </h3>

                      <p style={{
                        color: '#5a5a5a',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        marginBottom: '1rem'
                      }}>
                        {post.summary}
                      </p>

                      <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        color: '#8a8a8a',
                        fontSize: '0.875rem'
                      }}>
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div style={{
                      borderRadius: '8px',
                      backgroundColor: 'rgba(217, 119, 87, 0.1)',
                      border: '1px solid rgba(217, 119, 87, 0.2)'
                    }} />
                  </article>
                ))}
              </div>
            </div>
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
            textAlign: 'center'
          }}>
            <p style={{ color: '#5a5a5a', fontSize: '0.875rem' }}>
              &copy; 2026 Rei&apos;s World. 保留所有权利.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
