import { useState } from 'react'

const MAX_DIMENSION = 600
const JPEG_QUALITY = 0.6
const TIMEOUT = 8000

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    let timedOut = false

    const timer = setTimeout(() => {
      timedOut = true
      img.src = ''
      reject(new Error('Image load timed out'))
    }, TIMEOUT)

    img.onload = () => {
      if (timedOut) return
      clearTimeout(timer)
      try {
        let { width, height } = img
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round(height * (MAX_DIMENSION / width))
            width = MAX_DIMENSION
          } else {
            width = Math.round(width * (MAX_DIMENSION / height))
            height = MAX_DIMENSION
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else resolve(null)
        }, 'image/jpeg', JPEG_QUALITY)
      } catch {
        resolve(null)
      }
    }

    img.onerror = () => {
      clearTimeout(timer)
      reject(new Error('Failed to load image'))
    }

    img.src = URL.createObjectURL(file)
  })
}

function readAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => resolve(null)
    reader.readAsDataURL(file)
  })
}

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = async (file) => {
    setUploading(true)
    setProgress(0)

    try {
      let targetFile = file

      if (file.type.startsWith('image/')) {
        const compressed = await compressImage(file)
        if (compressed) {
          targetFile = new File([compressed], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' })
        }
      }

      setProgress(50)
      const dataUrl = await readAsDataURL(targetFile)
      setProgress(100)
      setUploading(false)
      return dataUrl
    } catch (err) {
      console.error('Upload error:', err)
      setUploading(false)
      return null
    }
  }

  return { upload, uploading, progress }
}