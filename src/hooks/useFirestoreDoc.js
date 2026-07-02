import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export function useFirestoreDoc(collectionName, docId = 'main') {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, collectionName, docId))
        if (snap.exists()) setData(snap.data())
        else setData(null)
      } catch {
        setData(null)
      }
      setLoading(false)
    }
    fetch()
  }, [collectionName, docId])

  const save = useCallback(async (newData) => {
    setSaving(true)
    try {
      await setDoc(doc(db, collectionName, docId), newData, { merge: true })
      setData(newData)
      return true
    } catch (err) {
      console.error('Save error:', err)
      return false
    } finally {
      setSaving(false)
    }
  }, [collectionName, docId])

  return { data, loading, saving, save }
}
