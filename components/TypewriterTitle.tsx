'use client'

import { useEffect, useState } from 'react'

export default function TypewriterTitle() {
  const [text, setText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "Rei's Digital Archive"
  const typingSpeed = 100 // 每个字符的打字速度（毫秒）

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, typingSpeed)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorTimer)
  }, [])

  const words = text.split(' ')
  const isComplete = text.length === fullText.length

  return (
    <h1 style={{
      fontFamily: "'Press Start 2P', monospace",
      fontSize: 'clamp(1.75rem, 2.8vw, 3rem)',
      marginBottom: '0',
      lineHeight: 2.2,
      color: '#2d2d2d',
      letterSpacing: '0.05em',
      whiteSpace: 'pre-wrap'
    }}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <span key={i} style={{ display: 'block' }}>
            {word}
            {isLast && (
              <span style={{
                display: 'inline-block',
                width: '0.12em',
                height: '1em',
                backgroundColor: '#2d2d2d',
                marginLeft: '0.08em',
                verticalAlign: 'text-bottom',
                opacity: (!isComplete || showCursor) ? 1 : 0
              }} />
            )}
          </span>
        )
      })}
    </h1>
  )
}
