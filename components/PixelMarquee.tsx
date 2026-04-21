'use client'

export default function PixelMarquee() {
  const content = '✦ LATEST POSTS ✦ CODE ✦ THOUGHTS ✦ DESIGN ✦ ARCHIVE ✦ '

  return (
    <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div style={{
        backgroundColor: '#d97757',
        overflow: 'hidden',
        padding: '1rem 0',
        position: 'relative',
        borderTop: '4px solid #b85d42',
        borderBottom: '4px solid #b85d42',
        boxShadow: '0 4px 0 rgba(45, 45, 45, 0.12), inset 0 2px 0 rgba(255, 255, 255, 0.18)'
      }}>
        <div style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'marquee 25s linear infinite'
        }}>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '14px',
            color: '#faf8f5',
            letterSpacing: '0.1em',
            paddingRight: '100vw'
          }}>
            {content.repeat(20)}
          </span>
        </div>
      </div>
    </div>
  )
}
