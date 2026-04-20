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
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(45, 45, 45, 0.08)'
      }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '2rem',
          textAlign: 'center',
          fontFamily: "'Press Start 2P', monospace"
        }}>
          管理后台登录
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '1rem',
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
                padding: '0.75rem',
                fontSize: '1rem',
                border: '1px solid rgb(217, 208, 194)',
                borderRadius: '6px',
                backgroundColor: 'rgb(240, 238, 230)'
              }}
              placeholder="请输入密码"
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem',
              marginBottom: '1rem',
              backgroundColor: 'rgba(217, 119, 87, 0.1)',
              color: '#d97757',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#d97757',
              color: '#faf8f5',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            登录
          </button>
        </form>

        <p style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#5a5a5a'
        }}>
          默认密码：admin123
        </p>
      </div>
    </div>
  )
}
