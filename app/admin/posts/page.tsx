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
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [router])

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
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontFamily: "'Press Start 2P', monospace"
          }}>
            文章管理
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link
              href="/"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: '#2d2d2d',
                border: '1px solid rgba(45, 45, 45, 0.1)',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              返回首页
            </Link>
            <Link
              href="/admin/posts/new"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#d97757',
                color: '#faf8f5',
                border: 'none',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              写新文章
            </Link>
          </div>
        </div>

        {/* 文章列表 */}
        <div style={{
          backgroundColor: 'rgb(227, 218, 204)',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 1px 3px rgba(45, 45, 45, 0.04)'
        }}>
          {posts.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#5a5a5a' }}>
              还没有文章，点击"写新文章"开始创作吧！
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {posts.map((post) => (
                <div
                  key={post.slug}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgb(240, 238, 230)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                      {post.title}
                    </h3>
                    <p style={{ color: '#5a5a5a', fontSize: '0.875rem' }}>
                      {post.date} · {post.tags.join(', ')}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link
                      href={`/posts/${post.slug}`}
                      target="_blank"
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'transparent',
                        color: '#2d2d2d',
                        border: '1px solid rgba(45, 45, 45, 0.1)',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '0.875rem'
                      }}
                    >
                      查看
                    </Link>
                    <Link
                      href={`/admin/posts/edit/${post.slug}`}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#d97757',
                        color: '#faf8f5',
                        border: 'none',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '0.875rem'
                      }}
                    >
                      编辑
                    </Link>
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
