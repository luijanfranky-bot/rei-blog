import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Rei's World - 个人博客",
  description: '一个优雅的复古风格博客，记录技术与生活',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
