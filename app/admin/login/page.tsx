'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 简单的密码验证（后面可以改成更安全的方式）
    if (password === 'admin123') {
      // 保存登录状态到 localStorage
      localStorage.setItem('isAdmin', 'true')
      router.push('/admin/posts')
    } else {
      setError('密码错误')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(240, 238, 230)'
    }}>
      <div style={{
        backgroundColor: 'rgb(227, 218, 204)',
        padding: '3rem',
        borderRadius: '4px',
        width: '100%',
        maxWidth: '400px',
        border: '2px solid rgba(45, 45, 45, 0.1)',
        boxShadow: '0 2px 8px rgba(45, 45, 45, 0.06)'
      }}>
        {/* 像素装饰 - 顶部 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '2px',
            background: 'linear-gradient(to right, transparent, #d97757)'
          }} />
          <span style={{ color: '#d97757', fontSize: '1.2rem' }}>▸</span>
          <div style={{
            width: '40px',
            height: '2px',
            background: 'linear-gradient(to left, transparent, #d97757)'
          }} />
        </div>

        <h1 style={{
          fontSize: 'clamp(1.25rem, 1.5vw, 1.5rem)',
          marginBottom: '2.5rem',
          textAlign: 'center',
          fontFamily: "'Ark Pixel', monospace",
          letterSpacing: '0.05em',
          lineHeight: 1.6
        }}>
          管理后台登录
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontFamily: "'Ark Pixel', monospace",
              color: '#2d2d2d'
            }}>
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                border: '2px solid rgba(45, 45, 45, 0.15)',
                borderRadius: '4px',
                backgroundColor: 'rgb(240, 238, 230)',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: "'Courier New', monospace"
              }}
              placeholder="请输入密码"
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
              backgroundColor: 'rgba(217, 119, 87, 0.1)',
              color: '#d97757',
              borderLeft: '3px solid #d97757',
              fontSize: '0.875rem',
              fontFamily: "'Ark Pixel', monospace"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="pixel-btn pixel-btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center'
            }}
          >
            登录
          </button>
        </form>

        <p style={{
          marginTop: '2rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: '#8a8a8a',
          fontFamily: "'Ark Pixel', monospace",
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(45, 45, 45, 0.08)'
        }}>
          默认密码：admin123
        </p>
      </div>
    </div>
  )
}
