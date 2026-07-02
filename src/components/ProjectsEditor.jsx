import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Save, Check, Loader2, Plus, X, Upload, FolderKanban, Pin } from 'lucide-react'
import { useFirestoreDoc } from '../hooks/useFirestoreDoc'
import { useFileUpload } from '../hooks/useFileUpload'

const DEFAULT_PROJECTS = [
  { pinned: true, image: null, icon: '\u{1F680}', title: 'Personal Portfolio Website', description: 'A responsive multi-page personal website created using Flask to showcase my skills, projects, resume, and contact information.', tech: ['Flask', 'HTML5', 'CSS3', 'Jinja2', 'Python'], github: 'https://github.com/sibap-dev/My_Portfolio', demo: 'https://sibas-portfolio.onrender.com/', category: 'Full Stack', gradient: 'from-[#00B4D8] via-[#0099CC] to-[#005577]' },
  { pinned: true, image: null, icon: '\u{1F3AC}', title: 'Netflix Clone', description: "A pixel-perfect front-end recreation of Netflix's interface using modern HTML and CSS techniques with responsive design and smooth animations.", tech: ['HTML5', 'CSS3', 'Responsive Design'], github: 'https://github.com/sibap-dev/Netflix_clone', demo: 'https://sibap-dev.github.io/Netflix_clone/', category: 'Frontend', gradient: 'from-[#9B59B6] via-[#7B1FA2] to-[#4A0072]' },
  { pinned: true, image: null, icon: '\u{1F3C6}', title: 'Tribute Page', description: 'An elegant tribute page showcasing clean HTML structure and beautiful CSS styling with attention to typography and visual hierarchy.', tech: ['HTML5', 'CSS3', 'Typography'], github: 'https://github.com/sibap-dev/Tribute_page', demo: null, category: 'Frontend', gradient: 'from-[#00B4D8] via-[#9B59B6] to-[#FF6B6B]' },
  { pinned: false, image: null, icon: '\u{1F4FA}', title: 'YouTube Video Downloader', description: 'A powerful web application that allows users to download YouTube videos with ease, built with Flask backend and intuitive user interface.', tech: ['Flask', 'Python', 'HTML5', 'API Integration'], github: 'https://github.com/sibap-dev/Youtube-download-main', demo: null, category: 'Backend', gradient: 'from-[#FF6B6B] via-[#9B59B6] to-[#00B4D8]' },
  { pinned: false, image: null, icon: '\u{1F9EE}', title: 'Online Calculator App', description: 'A fully functional calculator web application with a clean interface and smooth user experience, deployed on Render.', tech: ['Flask', 'HTML5', 'CSS3', 'JavaScript'], github: 'https://github.com/sibap-dev/Task_internship', demo: 'https://siba-calculator.onrender.com/', category: 'Full Stack', gradient: 'from-[#00B4D8] via-[#0099CC] to-[#005577]' },
  { pinned: false, image: null, icon: '\u{1F9F4}', title: 'Green Shyne - Phenyl Website', description: 'A feature-rich website built for a phenyl brand with product categories, media gallery, branches, contact form, and more.', tech: ['Flask', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'], github: 'https://github.com/sibap-dev/Green-Shyne', demo: 'https://green-shyne.vercel.app/', category: 'Full Stack', gradient: 'from-[#00B4D8] via-[#9B59B6] to-[#FF6B6B]' },
]

const GRADIENTS = [
  'from-[#00B4D8] via-[#0099CC] to-[#005577]',
  'from-[#9B59B6] via-[#7B1FA2] to-[#4A0072]',
  'from-[#00B4D8] via-[#9B59B6] to-[#FF6B6B]',
  'from-[#FF6B6B] via-[#9B59B6] to-[#00B4D8]',
  'from-[#00B4D8] via-[#0099CC] to-[#005577]',
  'from-[#00B4D8] via-[#9B59B6] to-[#FF6B6B]',
]

const ICONS = ['🚀', '🎬', '🏆', '📺', '🛠️', '🧴', '💻', '🎮', '📱', '🌐', '🤖', '🎨', '📊', '🔧', '📝']

function ProjectCard({ project, index, onUpdate, onRemove }) {
  const { upload, uploading, progress } = useFileUpload()

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await upload(file)
    if (url) onUpdate(index, 'image', url)
  }

  return (
    <div className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {project.pinned && <Pin className="w-3.5 h-3.5 text-[#00B4D8]" />}
          <span className="text-xs font-medium text-gray-400">Project {index + 1}</span>
        </div>
        <button onClick={() => onRemove(index)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Title</label>
            <input value={project.title} onChange={(e) => onUpdate(index, 'title', e.target.value)}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
          </div>
          <div className="w-full sm:w-24">
            <label className="block text-xs text-gray-500 mb-1">Icon</label>
            <select value={project.icon} onChange={(e) => onUpdate(index, 'icon', e.target.value)}
              className="w-full px-3 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all">
              {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Description</label>
          <textarea rows={2} value={project.description} onChange={(e) => onUpdate(index, 'description', e.target.value)}
            className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all resize-none" />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Technologies (comma separated)</label>
          <input value={project.tech?.join(', ') || ''} onChange={(e) => onUpdate(index, 'tech', e.target.value.split(',').map((t) => t.trim()))}
            className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">GitHub URL</label>
            <input value={project.github || ''} onChange={(e) => onUpdate(index, 'github', e.target.value)}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Demo URL</label>
            <input value={project.demo || ''} onChange={(e) => onUpdate(index, 'demo', e.target.value)}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Category</label>
          <input value={project.category || ''} onChange={(e) => onUpdate(index, 'category', e.target.value)}
            className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Gradient</label>
            <select value={project.gradient} onChange={(e) => onUpdate(index, 'gradient', e.target.value)}
              className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all">
              {GRADIENTS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={project.pinned || false} onChange={(e) => onUpdate(index, 'pinned', e.target.checked)}
                className="w-4 h-4 accent-[#00B4D8]" />
              <span className="text-sm text-gray-400">Pinned (featured)</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Project Image</label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {project.image && (
              <img src={project.image} alt="" className="w-14 h-10 rounded-lg object-cover border border-white/10 shrink-0" />
            )}
            <label className="cursor-pointer px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 shrink-0">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? `${Math.round(progress)}%` : 'Upload'}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            <input value={project.image || ''} onChange={(e) => onUpdate(index, 'image', e.target.value)} placeholder="Or paste URL..."
              className="flex-1 min-w-0 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsEditor() {
  const { data, loading, saving, save } = useFirestoreDoc('projects')
  const [projects, setProjects] = useState([])
  const [saved, setSaved] = useState(false)
  const nextId = useRef(1)

  useEffect(() => {
    if (data?.items) {
      const maxId = data.items.reduce((max, p) => Math.max(max, p._id || 0), 0)
      nextId.current = maxId + 1
      setProjects(data.items)
    }
  }, [data])

  useEffect(() => {
    if (data === null && !loading) {
      const maxId = DEFAULT_PROJECTS.reduce((max, p) => Math.max(max, p._id || 0), 0)
      nextId.current = maxId + 1
      setProjects(DEFAULT_PROJECTS)
    }
  }, [data, loading])

  const handleSave = async () => {
    const ok = await save({ items: projects })
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  }

  const addProject = () => {
    const id = nextId.current++
    setProjects((p) => [...p, {
      _id: id, pinned: false, image: null, icon: '🚀', title: '', description: '',
      tech: [], github: '', demo: '', category: 'Full Stack', gradient: GRADIENTS[0],
    }])
  }

  const updateProject = (index, field, value) => {
    setProjects((p) => {
      const updated = [...p]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const removeProject = (index) => {
    setProjects((p) => p.filter((_, i) => i !== index))
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-white/20 border-t-[#00B4D8] rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Projects Section</h2>
          <p className="text-sm text-gray-400 mt-1">Manage your portfolio projects</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button whileHover={{ scale: 1.02 }} onClick={addProject}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all">
            <Plus className="w-4 h-4" /> Add Project
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00B4D8] via-[#9B59B6] to-[#FF6B6B] text-white rounded-xl font-medium text-sm disabled:opacity-50 shadow-lg shadow-[#00B4D8]/20 hover:shadow-[#00B4D8]/30 transition-shadow">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </motion.button>
        </div>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-16 text-gray-500 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <FolderKanban className="w-10 h-10 mx-auto mb-3 text-gray-600" />
            <p className="text-sm">No projects yet. Click "Add Project" to get started.</p>
          </div>
        ) : (
          projects.map((project, i) => (
            <ProjectCard key={project._id || i} project={project} index={i} onUpdate={updateProject} onRemove={removeProject} />
          ))
        )}
      </div>
    </div>
  )
}