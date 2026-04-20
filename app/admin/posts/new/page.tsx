'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [cover, setCover] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // 检查登录状态
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      router.push('/admin/login')
    }
  }, [router])

  const handleSave = async () => {
    if (!title || !content) {
      alert('标题和内容不能为空')
      return
    }

    setSaving(true)

    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          tags: tags.split(',').map(t => t.trim()).filter(t => t),
          summary,
          content,
          cover,
        }),
      })

      if (response.ok) {
        alert('文章保存成功！')
        router.push('/admin/posts')
      } else {
        alert('保存失败，请重试')
      }
    } catch (error) {
      alert('保存失败：' + error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'rgb(240, 238, 230)',
      padding: '2rem'
    }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
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
            写新文章
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link
              href="/admin/posts"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: '#2d2d2d',
                border: '1px solid rgba(45, 45, 45, 0.1)',
                borderRadius: '6px',
                textDecoration: 'none'
              }}
            >
              取消
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#d97757',
                color: '#faf8f5',
                border: 'none',
                borderRadius: '6px',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.6 : 1
              }}
            >
              {saving ? '保存中...' : '发布文章'}
            </button>
          </div>
        </div>

        {/* 编辑器区域 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem'
        }}>
          {/* 左侧：输入区 */}
          <div style={{
            backgroundColor: 'rgb(227, 218, 204)',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 1px 3px rgba(45, 45, 45, 0.04)'
          }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>文章信息</h2>

            {/* 标题 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#2d2d2d'
              }}>
                标题 *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="输入文章标题"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid rgb(217, 208, 194)',
                  borderRadius: '6px',
                  backgroundColor: 'rgb(240, 238, 230)'
                }}
              />
            </div>

            {/* 标签 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#2d2d2d'
              }}>
                标签（用逗号分隔）
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="例如：技术, 前端"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid rgb(217, 208, 194)',
                  borderRadius: '6px',
                  backgroundColor: 'rgb(240, 238, 230)'
                }}
              />
            </div>

            {/* 摘要 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#2d2d2d'
              }}>
                摘要
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="简短描述文章内容"
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid rgb(217, 208, 194)',
                  borderRadius: '6px',
                  backgroundColor: 'rgb(240, 238, 230)',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* 封面图 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#2d2d2d'
              }}>
                封面图 URL（可选）
              </label>
              <input
                type="text"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                placeholder="https://example.com/image.jpg"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid rgb(217, 208, 194)',
                  borderRadius: '6px',
                  backgroundColor: 'rgb(240, 238, 230)'
                }}
              />
            </div>

            {/* Markdown 内容 */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#2d2d2d'
              }}>
                内容（Markdown 格式）*
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="使用 Markdown 格式编写文章内容..."
                rows={20}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '0.95rem',
                  border: '1px solid rgb(217, 208, 194)',
                  borderRadius: '6px',
                  backgroundColor: 'rgb(240, 238, 230)',
                  fontFamily: "'Courier New', monospace",
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* 右侧：预览区 */}
          <div style={{
            backgroundColor: 'rgb(227, 218, 204)',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 1px 3px rgba(45, 45, 45, 0.04)',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>预览</h2>

            {title && (
              <h1 style={{
                fontSize: 'clamp(2rem, 3vw, 3rem)',
                marginBottom: '1rem',
                lineHeight: 1.2
              }}>
                {title}
              </h1>
            )}

            {tags && (
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {tags.split(',').map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.875rem',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(217, 119, 87, 0.1)',
                      color: '#d97757'
                    }}
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {summary && (
              <p style={{
                color: '#5a5a5a',
                fontSize: '1.125rem',
                marginBottom: '2rem',
                fontStyle: 'italic'
              }}>
                {summary}
              </p>
            )}

            <hr style={{
              border: 'none',
              borderTop: '1px solid rgb(217, 208, 194)',
              margin: '2rem 0'
            }} />

            {content ? (
              <div
                style={{
                  lineHeight: 1.8,
                  color: '#2d2d2d',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {content}
              </div>
            ) : (
              <p style={{ color: '#8a8a8a', fontStyle: 'italic' }}>
                在左侧输入内容，这里会显示预览...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
