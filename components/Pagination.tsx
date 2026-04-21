import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.75rem',
      marginTop: '4rem',
      paddingTop: '3rem',
      borderTop: '2px solid rgba(45, 45, 45, 0.1)'
    }}>
      {/* 上一页 */}
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? '/' : `/?page=${currentPage - 1}`}
          className="pixel-btn pixel-btn-secondary"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '11px'
          }}
        >
          ← 上一页
        </Link>
      ) : (
        <span
          className="pixel-btn"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '11px',
            opacity: 0.3,
            cursor: 'not-allowed',
            backgroundColor: 'transparent',
            borderColor: '#2d2d2d',
            color: '#2d2d2d'
          }}
        >
          ← 上一页
        </span>
      )}

      {/* 页码 */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center'
      }}>
        {pages.map((page) => (
          page === currentPage ? (
            <span
              key={page}
              className="pixel-btn pixel-btn-primary"
              style={{ padding: '0.75rem 1rem', fontSize: '11px', minWidth: '44px' }}
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={page === 1 ? '/' : `/?page=${page}`}
              className="pixel-btn pixel-btn-secondary"
              style={{ padding: '0.75rem 1rem', fontSize: '11px', minWidth: '44px', textDecoration: 'none' }}
            >
              {page}
            </Link>
          )
        ))}
      </div>

      {/* 下一页 */}
      {currentPage < totalPages ? (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="pixel-btn pixel-btn-secondary"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '11px'
          }}
        >
          下一页 →
        </Link>
      ) : (
        <span
          className="pixel-btn"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '11px',
            opacity: 0.3,
            cursor: 'not-allowed',
            backgroundColor: 'transparent',
            borderColor: '#2d2d2d',
            color: '#2d2d2d'
          }}
        >
          下一页 →
        </span>
      )}
    </nav>
  )
}
