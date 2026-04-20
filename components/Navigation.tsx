'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

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
      paddingTop: '1rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '0 clamp(2rem, 1.08vw + 3.92vw, 5rem)',
        border: '3px solid #d97757',
        backgroundColor: 'rgb(240, 238, 230)'
      }}>
        {/* Logo 区域 */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none'
        }}>
          <Image
            src="/logo-avatar.png"
            alt="Rei"
            width={40}
            height={40}
            className="pixel-art"
            style={{ borderRadius: '2px' }}
          />
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '16px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#2d2d2d'
          }}>
            Rei&apos;s World
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
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '14px',
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
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '14px',
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
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '14px',
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
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '14px',
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
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '14px',
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
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '14px',
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
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '14px',
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
