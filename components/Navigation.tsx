'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // 检查登录状态
    const checkLoginStatus = () => {
      const isAdmin = localStorage.getItem('isAdmin')
      setIsLoggedIn(!!isAdmin)
    }

    checkLoginStatus()

    // 监听 storage 事件，当其他标签页改变登录状态时同步
    window.addEventListener('storage', checkLoginStatus)

    return () => {
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    setIsLoggedIn(false)
    router.push('/')
    // 刷新页面以确保状态更新
    window.location.reload()
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 300,
      backgroundColor: 'rgb(240, 238, 230)',
      height: '4.25rem',
      borderBottom: '4px solid #b85d42',
      boxShadow: '0 4px 0 rgba(45, 45, 45, 0.12), inset 0 -2px 0 rgba(255, 255, 255, 0.18)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '0 clamp(2rem, 1.08vw + 3.92vw, 5rem)',
        backgroundColor: 'rgb(240, 238, 230)'
      }}>
        {/* Logo 区域 */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none'
        }}>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '16px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#2d2d2d'
          }}>
            EVANGELIAN - 01
          </span>
        </Link>

        {/* 导航菜单 */}
        <ul style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          alignItems: 'center'
        }}>
          <li>
            <Link href="/" style={{
              fontFamily: "'Ark Pixel', monospace",
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#d97757',
              textDecoration: 'none',
              transition: 'color 0.15s ease'
            }}>
              首页
            </Link>
          </li>
          <li>
            <Link href="#" style={{
              fontFamily: "'Ark Pixel', monospace",
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#5a5a5a',
              textDecoration: 'none',
              transition: 'color 0.15s ease'
            }}>
              文章
            </Link>
          </li>
          <li>
            <Link href="#" style={{
              fontFamily: "'Ark Pixel', monospace",
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#5a5a5a',
              textDecoration: 'none',
              transition: 'color 0.15s ease'
            }}>
              项目
            </Link>
          </li>
          <li>
            <Link href="#" style={{
              fontFamily: "'Ark Pixel', monospace",
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#5a5a5a',
              textDecoration: 'none',
              transition: 'color 0.15s ease'
            }}>
              关于
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link href="/admin/posts" style={{
                fontFamily: "'Ark Pixel', monospace",
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#d97757',
                textDecoration: 'none',
                transition: 'color 0.15s ease'
              }}>
                管理
              </Link>
            </li>
          )}
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                style={{
                  fontFamily: "'Ark Pixel', monospace",
                  fontSize: '16px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#d97757',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                  padding: '0.5rem 1rem',
                  border: '2px solid #d97757',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  cursor: 'pointer'
                }}
              >
                登出
              </button>
            ) : (
              <Link href="/admin/login" style={{
                fontFamily: "'Ark Pixel', monospace",
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#d97757',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
                padding: '0.5rem 1rem',
                border: '2px solid #d97757',
                borderRadius: '4px',
                display: 'inline-block'
              }}>
                登录
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
