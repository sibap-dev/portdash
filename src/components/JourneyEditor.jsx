import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Check, Loader2, Plus, X, Calendar, Eye } from 'lucide-react'
import { useFirestoreDoc } from '../hooks/useFirestoreDoc'
import { useAuth } from '../contexts/AuthContext'

const DEFAULT_JOURNEY = [
  { icon: 'GraduationCap', year: '2022 - Present', title: 'CSE Student', description: 'Pursuing Computer Science degree at NIST University, building a strong foundation in programming, algorithms, and software engineering.', highlights: ['Data Structures', 'Algorithms', 'Web Development'] },
  { icon: 'Briefcase', year: '2024', title: 'Python Developer Intern', description: 'Professional development experience in Python programming at Asirudh Software Private Limited, working on real-world projects and industry-standard practices.', highlights: ['Python', 'Real-world Projects', 'Industry Practices'] },
  { icon: 'Code', year: '2024', title: 'Advanced Programming Internship', description: 'Specialized training in Advanced Programming and Competitive Coding at NIST University, enhancing problem-solving and algorithmic thinking skills.', highlights: ['Competitive Coding', 'Problem Solving', 'Algorithms'] },
  { icon: 'Award', year: '2024', title: 'AI & Machine Learning Workshop', description: '2-day intensive workshop on AI and Machine Learning with Data Science at IIT Bhubaneswar, exploring cutting-edge technologies and applications.', highlights: ['Artificial Intelligence', 'Machine Learning', 'Data Science'] },
]

const ICON_OPTIONS = [
  { value: 'GraduationCap', label: '🎓 Graduation' },
  { value: 'Briefcase', label: '💼 Work' },
  { value: 'Code', label: '💻 Code' },
  { value: 'Award', label: '🏆 Award' },
  { value: 'Rocket', label: '🚀 Launch' },
  { value: 'BookOpen', label: '📚 Learning' },
]

function JourneyEntry({ entry, index, onUpdate, onRemove }) {
  return (
    <div className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-gray-400">Entry {index + 1}</span>
        <button onClick={() => onRemove(index)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Year / Period</label>
            <input value={entry.year || ''} onChange={(e) => onUpdate(index, 'year', e.target.value)}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Icon</label>
            <select value={entry.icon || 'GraduationCap'} onChange={(e) => onUpdate(index, 'icon', e.target.value)}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all">
              {ICON_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Title</label>
          <input value={entry.title || ''} onChange={(e) => onUpdate(index, 'title', e.target.value)}
            className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Description</label>
          <textarea rows={2} value={entry.description || ''} onChange={(e) => onUpdate(index, 'description', e.target.value)}
            className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all resize-none" />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Highlights (comma separated)</label>
          <input value={entry.highlights?.join(', ') || ''} onChange={(e) => onUpdate(index, 'highlights', e.target.value.split(',').map((h) => h.trim()))}
            className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
        </div>
      </div>
    </div>
  )
}

export default function JourneyEditor() {
  const { data, loading, saving, save } = useFirestoreDoc('journey')
  const [entries, setEntries] = useState([])
  const [saved, setSaved] = useState(false)
  const { isAuthorized } = useAuth()

  useEffect(() => {
    if (data?.items) setEntries(data.items)
  }, [data])

  useEffect(() => {
    if (data === null && !loading) setEntries(DEFAULT_JOURNEY)
  }, [data, loading])

  const handleSave = async () => {
    const ok = await save({ items: entries })
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  }

  const addEntry = () => setEntries((e) => [...e, {
    icon: 'GraduationCap', year: '', title: '', description: '', highlights: [],
  }])

  const updateEntry = (i, field, value) => {
    setEntries((e) => {
      const updated = [...e]
      updated[i] = { ...updated[i], [field]: value }
      return updated
    })
  }

  const removeEntry = (i) => setEntries((e) => e.filter((_, idx) => idx !== i))

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-white/20 border-t-[#00B4D8] rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Journey Section</h2>
          <p className="text-sm text-gray-400 mt-1">Edit your timeline entries</p>
          {!isAuthorized && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full w-fit">
              <Eye className="w-3 h-3" /> Read-only view
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <motion.button whileHover={{ scale: 1.02 }} onClick={addEntry} disabled={!isAuthorized}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-medium text-sm disabled:opacity-40 hover:bg-white/10 hover:border-white/20 transition-all">
            <Plus className="w-4 h-4" /> Add Entry
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSave} disabled={!isAuthorized || saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00B4D8] via-[#9B59B6] to-[#FF6B6B] text-white rounded-xl font-medium text-sm disabled:opacity-50 shadow-lg shadow-[#00B4D8]/20 hover:shadow-[#00B4D8]/30 transition-shadow">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : saved ? 'Saved!' : isAuthorized ? 'Save Changes' : 'Viewing (read-only)'}
          </motion.button>
        </div>
      </div>

      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-16 text-gray-500 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <Calendar className="w-10 h-10 mx-auto mb-3 text-gray-600" />
            <p className="text-sm">No journey entries yet. Click "Add Entry" to get started.</p>
          </div>
        ) : (
          entries.map((entry, i) => (
            <JourneyEntry key={i} entry={entry} index={i} onUpdate={updateEntry} onRemove={removeEntry} />
          ))
        )}
      </div>
    </div>
  )
}