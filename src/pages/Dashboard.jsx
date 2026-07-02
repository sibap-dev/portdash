import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from '../components/Sidebar'
import HeroEditor from '../components/HeroEditor'
import AboutEditor from '../components/AboutEditor'
import ProjectsEditor from '../components/ProjectsEditor'
import JourneyEditor from '../components/JourneyEditor'
import ContactEditor from '../components/ContactEditor'

const TABS = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('hero')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <Sidebar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onLogout={logout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3 flex items-center justify-between md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#00B4D8] via-[#9B59B6] to-[#FF6B6B] flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">P</span>
            </div>
            <span className="text-sm font-medium text-white">Portfolio</span>
          </div>
          <div className="w-8" />
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {activeTab === 'hero' && <HeroEditor />}
              {activeTab === 'about' && <AboutEditor />}
              {activeTab === 'projects' && <ProjectsEditor />}
              {activeTab === 'journey' && <JourneyEditor />}
              {activeTab === 'contact' && <ContactEditor />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}