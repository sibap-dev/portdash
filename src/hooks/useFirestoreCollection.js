import { useState, useEffect, useCallback } from 'react'
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export function useFirestoreCollection(collectionName) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const snap = await getDocs(collection(db, collectionName))
      const list = []
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }))
      setItems(list)
    } catch {
      setItems([])
    }
    setLoading(false)
  }, [collectionName])

  useEffect(() => { fetchItems() }, [fetchItems])

  const addItem = useCallback(async (id, data) => {
    await setDoc(doc(db, collectionName, id), data)
    await fetchItems()
  }, [collectionName, fetchItems])

  const updateItem = useCallback(async (id, data) => {
    await setDoc(doc(db, collectionName, id), data, { merge: true })
    await fetchItems()
  }, [collectionName, fetchItems])

  const removeItem = useCallback(async (id) => {
    await deleteDoc(doc(db, collectionName, id))
    await fetchItems()
  }, [collectionName, fetchItems])

  return { items, loading, addItem, updateItem, removeItem, refresh: fetchItems }
}
