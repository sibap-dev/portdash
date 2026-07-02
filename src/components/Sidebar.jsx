import { motion } from 'framer-motion'
import { Sparkles, User, Info, Briefcase, Map, Mail, LogOut, X } from 'lucide-react'

const TAB_ICONS = {
  hero: Sparkles,
  about: Info,
  projects: Briefcase,
  journey: Map,
  contact: Mail,
}

export default function Sidebar({ tabs, activeTab, onTabChange, user, onLogout, open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />}

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/[0.06] flex flex-col z-50 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00B4D8] via-[#9B59B6] to-[#FF6B6B] flex items-center justify-center shadow-lg shadow-[#00B4D8]/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-display text-white">Dashboard</h1>
              <p className="text-[10px] text-gray-500">Portfolio Manager</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-white md:hidden transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = TAB_ICONS[tab.id] || Sparkles
            return (
              <motion.button
                key={tab.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { onTabChange(tab.id); onClose?.() }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#00B4D8]/15 via-[#9B59B6]/15 to-[#FF6B6B]/15 text-white border border-white/[0.08] shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#00B4D8]' : ''}`} />
                {tab.label}
              </motion.button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 mb-3 px-1">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full ring-2 ring-white/10" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00B4D8] to-[#9B59B6] flex items-center justify-center text-xs font-bold text-white">
                {user?.email?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate text-white">{user?.displayName || 'User'}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 hover:border-red-500/20 transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </motion.button>
        </div>
      </aside>
    </>
  )
}