'use client'

import { useState, useCallback } from 'react'

interface ImageDropzoneProps {
  onImageUpload: (url: string) => void
  currentImage?: string
}

export default function ImageDropzone({ onImageUpload, currentImage }: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const uploadImage = async (file: File) => {
    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      alert('只支持 JPG、PNG、WebP 和 GIF 格式的图片')
      return
    }

    // 验证文件大小（5MB）
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB')
      return
    }

    setUploading(true)

    try {
      // 创建 FormData
      const formData = new FormData()
      formData.append('file', file)

      // 上传到 API
      const response = await fetch('/api/upload-cover', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('上传失败')
      }

      const data = await response.json()

      // 设置预览和回调
      setPreview(data.url)
      onImageUpload(data.url)

      alert('封面图上传成功！')
    } catch (error) {
      console.error('上传错误:', error)
      alert('上传失败，请重试')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      await uploadImage(files[0])
    }
  }, [])

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await uploadImage(files[0])
    }
  }, [])

  return (
    <div>
      <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: '#2d2d2d'
      }}>
        封面图（可选）
      </label>

      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: isDragging
            ? '3px dashed #d97757'
            : '2px dashed rgba(184, 93, 66, 0.3)',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: isDragging
            ? 'rgba(217, 119, 87, 0.05)'
            : 'rgb(240, 238, 230)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        {uploading ? (
          <div>
            <p style={{ fontSize: '1rem', color: '#d97757', marginBottom: '0.5rem' }}>
              上传中...
            </p>
          </div>
        ) : preview ? (
          <div>
            <img
              src={preview}
              alt="封面预览"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                borderRadius: '4px',
                marginBottom: '1rem'
              }}
            />
            <p style={{ fontSize: '0.875rem', color: '#5a5a5a' }}>
              拖拽新图片替换，或点击下方按钮
            </p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '1rem', color: '#5a5a5a', marginBottom: '0.5rem' }}>
              {isDragging ? '松开鼠标上传图片' : '拖拽图片到这里'}
            </p>
            <p style={{ fontSize: '0.875rem', color: '#8a8a8a' }}>
              或点击下方按钮选择文件
            </p>
            <p style={{ fontSize: '0.75rem', color: '#8a8a8a', marginTop: '0.5rem' }}>
              支持 JPG、PNG、WebP、GIF，最大 5MB
            </p>
          </div>
        )}

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileInput}
          style={{ display: 'none' }}
          id="file-input"
        />
      </div>

      {!uploading && (
        <label
          htmlFor="file-input"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#d97757',
            color: '#faf8f5',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            border: 'none'
          }}
        >
          选择文件
        </label>
      )}
    </div>
  )
}
