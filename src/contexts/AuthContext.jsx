import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

const AUTHORIZED_EMAIL = import.meta.env.VITE_AUTHORIZED_EMAIL

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  const clearError = () => setAuthError(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && u.email !== AUTHORIZED_EMAIL) {
        signOut(auth)
        setUser(null)
        setAuthError(`Access restricted to ${AUTHORIZED_EMAIL}`)
      } else {
        setUser(u)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const login = async () => {
    setAuthError(null)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (result.user.email !== AUTHORIZED_EMAIL) {
        await signOut(auth)
        setUser(null)
        setAuthError(`Access restricted to ${AUTHORIZED_EMAIL}`)
      }
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError(err.message)
      }
    }
  }

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, authError, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
