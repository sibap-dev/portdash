import { useState } from 'react'

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = (file) => {
    setUploading(true)
    setProgress(0)
    console.log('Converting file to base64:', file.name, file.size)

    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100))
        }
      }
      reader.onload = () => {
        setProgress(100)
        setUploading(false)
        const dataUrl = reader.result
        const b64 = dataUrl.split(',')[1]
        const decodedLen = atob(b64).length
        console.log('Data URL prefix:', dataUrl.slice(0, 80))
        console.log('Expected bytes:', file.size, 'Decoded bytes:', decodedLen, 'Match:', file.size === decodedLen)
        resolve(dataUrl)
      }
      reader.onerror = () => {
        console.error('File read error:', reader.error)
        setUploading(false)
        resolve(null)
      }
      reader.readAsDataURL(file)
    })
  }

  return { upload, uploading, progress }
}