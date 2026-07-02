import { motion } from 'framer-motion'
import { Sparkles, AlertCircle, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { login, authError, clearError } = useAuth()

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-[#00B4D8] rounded-full blur-[120px] opacity-[0.05] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#9B59B6] rounded-full blur-[120px] opacity-[0.05] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF6B6B] rounded-full blur-[100px] opacity-[0.03]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative"
      >
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-10 text-center backdrop-blur-xl shadow-[0_0_60px_rgba(0,180,216,0.05)]">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#00B4D8] via-[#9B59B6] to-[#FF6B6B] flex items-center justify-center shadow-lg shadow-[#00B4D8]/20">
            <Sparkles className="w-7 h-7 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-white font-display mb-2">
            Portfolio Dashboard
          </h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Sign in with your Google account to manage your portfolio content
          </p>

          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-left"
            >
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-300 flex-1">{authError}</p>
              <button onClick={clearError} className="text-red-400 hover:text-red-300">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={login}
            className="w-full py-3.5 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </motion.button>

          <p className="mt-6 text-[10px] text-gray-600">
            Only your name, email, and profile photo will be accessed
          </p>
        </div>
      </motion.div>
    </div>
  )
}