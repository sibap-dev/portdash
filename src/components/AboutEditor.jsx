import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Check, Loader2, Plus, X, FileText, BarChart3, Award, Eye } from 'lucide-react'
import { useFirestoreDoc } from '../hooks/useFirestoreDoc'
import { useAuth } from '../contexts/AuthContext'

const DEFAULT_ABOUT = {
  bio: "I'm a CSE student at NIST University, passionate about development and programming, constantly exploring new technologies to build innovative solutions.",
  bioExtra: 'I thrive on turning complex problems into elegant solutions. Every challenge is an opportunity to learn and grow. Quality over quantity, always.',
  stats: [
    { label: 'Projects Completed', value: 50, suffix: '+' },
    { label: 'Years Experience', value: 3, suffix: '+' },
    { label: 'Cups of Coffee', value: 100, suffix: '+' },
    { label: 'Lines of Code', value: 99, suffix: 'K+' },
  ],
  features: [
    { title: 'AI & Machine Learning Workshop', subtitle: 'IIT Bhubaneswar', description: '2-day intensive workshop on AI and Machine Learning with Data Science, exploring cutting-edge technologies and applications.', link: '', priority: 1 },
    { title: 'Advanced Programming Internship', subtitle: 'NIST University', description: 'Specialized training in Advanced Programming and Competitive Coding, enhancing problem-solving and algorithmic thinking skills.', link: '', priority: 2 },
    { title: 'Python Developer Intern', subtitle: 'Asirudh Software Private Limited', description: 'Professional development experience in Python programming, working on real-world projects and industry-standard practices.', link: '', priority: 3 },
  ],
}

export default function AboutEditor() {
  const { data, loading, saving, save } = useFirestoreDoc('about')
  const [form, setForm] = useState(DEFAULT_ABOUT)
  const [saved, setSaved] = useState(false)
  const { isAuthorized } = useAuth()

  useEffect(() => {
    if (data) setForm({ ...DEFAULT_ABOUT, ...data })
  }, [data])

  const handleSave = async () => {
    const ok = await save(form)
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  }

  const updateStat = (i, field, value) => {
    setForm((f) => {
      const stats = [...f.stats]
      stats[i] = { ...stats[i], [field]: value }
      return { ...f, stats }
    })
  }

  const addStat = () => setForm((f) => ({ ...f, stats: [...f.stats, { label: '', value: 0, suffix: '' }] }))
  const removeStat = (i) => setForm((f) => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) }))

  const updateFeature = (i, field, value) => {
    setForm((f) => {
      const features = [...f.features]
      features[i] = { ...features[i], [field]: value }
      return { ...f, features }
    })
  }

  const addFeature = () => setForm((f) => ({ ...f, features: [...f.features, { title: '', subtitle: '', description: '', link: '', priority: f.features.length + 1 }] }))
  const removeFeature = (i) => setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }))

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-white/20 border-t-[#00B4D8] rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">About Section</h2>
          <p className="text-sm text-gray-400 mt-1">Edit your about/bio content</p>
          {!isAuthorized && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full w-fit">
              <Eye className="w-3 h-3" /> Read-only view
            </div>
          )}
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handleSave} disabled={!isAuthorized || saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00B4D8] via-[#9B59B6] to-[#FF6B6B] text-white rounded-xl font-medium text-sm disabled:opacity-50 shadow-lg shadow-[#00B4D8]/20 hover:shadow-[#00B4D8]/30 transition-shadow">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : isAuthorized ? 'Save Changes' : 'Viewing (read-only)'}
        </motion.button>
      </div>

      <div className="space-y-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00B4D8]" /> Bio
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Main Bio</label>
              <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all resize-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Extra Bio Paragraph</label>
              <textarea rows={3} value={form.bioExtra} onChange={(e) => setForm({ ...form, bioExtra: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all resize-none" />
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#00B4D8]" /> Stats
            </h3>
            <motion.button whileHover={{ scale: 1.05 }} onClick={addStat}
              className="text-xs text-[#00B4D8] hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-[#00B4D8]/10">
              <Plus className="w-3 h-3" /> Add Stat
            </motion.button>
          </div>
          <div className="space-y-3">
            {form.stats.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-6">No stats yet. Click "Add Stat" to create one.</p>
            )}
            {form.stats.map((stat, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center p-3 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                <input value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)} placeholder="Label"
                  className="flex-[2] px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
                <input type="number" value={stat.value} onChange={(e) => updateStat(i, 'value', Number(e.target.value))} placeholder="Value"
                  className="flex-1 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
                <input value={stat.suffix} onChange={(e) => updateStat(i, 'suffix', e.target.value)} placeholder="Suffix (+)"
                  className="w-full sm:w-20 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
                <button onClick={() => removeStat(i)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#00B4D8]" /> Key Achievements / Features
            </h3>
            <motion.button whileHover={{ scale: 1.05 }} onClick={addFeature}
              className="text-xs text-[#00B4D8] hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-[#00B4D8]/10">
              <Plus className="w-3 h-3" /> Add
            </motion.button>
          </div>
          <div className="space-y-4">
            {form.features.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-6">No achievements yet. Click "Add" to create one.</p>
            )}
            {form.features.map((feat, i) => (
              <div key={i} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-colors">
                <div className="flex justify-between mb-3">
                  <span className="text-xs text-gray-500 font-medium">Achievement {i + 1}</span>
                  <button onClick={() => removeFeature(i)} className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 p-1 rounded-lg transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input value={feat.title} onChange={(e) => updateFeature(i, 'title', e.target.value)} placeholder="Title"
                    className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
                  <input value={feat.subtitle} onChange={(e) => updateFeature(i, 'subtitle', e.target.value)} placeholder="Subtitle (e.g. Institution)"
                    className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
                  <textarea rows={2} value={feat.description} onChange={(e) => updateFeature(i, 'description', e.target.value)} placeholder="Description"
                    className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all resize-none" />
                  <div className="flex items-center gap-2">
                    <input value={feat.link || ''} onChange={(e) => updateFeature(i, 'link', e.target.value)} placeholder="Certificate URL (optional)"
                      className="flex-1 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
                    <div className="flex items-center gap-1.5 shrink-0">
                      <label className="text-xs text-gray-500">Priority</label>
                      <input type="number" min="1" value={feat.priority || i + 1} onChange={(e) => updateFeature(i, 'priority', parseInt(e.target.value) || 1)}
                        className="w-16 px-3 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all text-center" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}