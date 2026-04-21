'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const router = useRouter()

  useEffect(() => {
    // 检查登录状态
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    // 获取文章列表
    loadPosts()
  }, [router])

  const loadPosts = () => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`确定要删除文章《${title}》吗？此操作不可恢复。`)) {
      return
    }

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('文章已删除')
        loadPosts() // 重新加载列表
      } else {
        alert('删除失败，请重试')
      }
    } catch (error) {
      console.error('删除错误:', error)
      alert('删除失败：' + error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    router.push('/admin/login')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'rgb(240, 238, 230)',
      padding: '2rem'
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* 头部 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            fontFamily: "'Ark Pixel', monospace",
            letterSpacing: '0.05em'
          }}>
            文章管理
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link
              href="/"
              className="pixel-btn pixel-btn-secondary"
              style={{
                textDecoration: 'none'
              }}
            >
              返回首页
            </Link>
            <Link
              href="/admin/posts/new"
              className="pixel-btn pixel-btn-primary"
              style={{
                textDecoration: 'none'
              }}
            >
              写新文章
            </Link>
          </div>
        </div>

        {/* 文章列表 */}
        <div style={{
          backgroundColor: 'rgb(227, 218, 204)',
          borderRadius: '4px',
          padding: '2rem',
          border: '2px solid rgba(45, 45, 45, 0.1)',
          boxShadow: '0 2px 8px rgba(45, 45, 45, 0.06)'
        }}>
          {posts.length === 0 ? (
            <p style={{
              textAlign: 'center',
              color: '#5a5a5a',
              fontFamily: "'Ark Pixel', monospace",
              fontSize: '14px'
            }}>
              还没有文章，点击"写新文章"开始创作吧！
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {posts.map((post) => (
                <div
                  key={post.slug}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgb(240, 238, 230)',
                    borderRadius: '4px',
                    border: '2px solid rgba(45, 45, 45, 0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      marginBottom: '0.75rem',
                      fontFamily: "'Ark Pixel', monospace",
                      letterSpacing: '0.02em'
                    }}>
                      {post.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        color: '#5a5a5a',
                        fontSize: '0.875rem',
                        fontFamily: "'Ark Pixel', monospace"
                      }}>
                        {post.date}
                      </span>
                      {post.tags.length > 0 && (
                        <>
                          <span style={{ color: '#8a8a8a' }}>·</span>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                    <Link
                      href={`/posts/${post.slug}`}
                      target="_blank"
                      className="pixel-btn pixel-btn-secondary"
                      style={{
                        textDecoration: 'none',
                        fontSize: '12px',
                        padding: '0.5rem 1rem'
                      }}
                    >
                      查看
                    </Link>
                    <Link
                      href={`/admin/posts/edit/${post.slug}`}
                      className="pixel-btn pixel-btn-primary"
                      style={{
                        textDecoration: 'none',
                        fontSize: '12px',
                        padding: '0.5rem 1rem'
                      }}
                    >
                      编辑
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug, post.title)}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '12px',
                        fontFamily: "'Press Start 2P', monospace",
                        backgroundColor: 'transparent',
                        color: '#dc2626',
                        border: '2px solid #dc2626',
                        borderRadius: '0',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '2px 2px 0 rgba(220, 38, 38, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc2626'
                        e.currentTarget.style.color = '#faf8f5'
                        e.currentTarget.style.transform = 'translate(-2px, -2px)'
                        e.currentTarget.style.boxShadow = '4px 4px 0 rgba(220, 38, 38, 0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = '#dc2626'
                        e.currentTarget.style.transform = 'translate(0, 0)'
                        e.currentTarget.style.boxShadow = '2px 2px 0 rgba(220, 38, 38, 0.3)'
                      }}
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
