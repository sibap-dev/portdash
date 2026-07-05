import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Check, Loader2, Upload, Plus, X, Globe, Hash, AtSign, FileText, Eye, ImageIcon, ArrowUp, ArrowDown } from 'lucide-react'
import { useFirestoreDoc } from '../hooks/useFirestoreDoc'
import { useFileUpload } from '../hooks/useFileUpload'
import { useAuth } from '../contexts/AuthContext'

const DEFAULT_HERO = {
  name: 'Siba Prasad Padhi',
  tagline: 'Crafting innovative web applications, exploring cutting-edge technologies, and building digital experiences that make an impact.',
  badge: 'Available for opportunities',
  subtitlePrefix: "I'm a ",
  subtitleWords: ['Developer', 'Creative Thinker', 'Problem Solver', 'Innovator', 'Tech Enthusiast'],
  profileImage: '/profile.jpg',
  gallery: [],
  resumeUrl: '/resume.pdf',
  socialLinks: [
    { platform: 'github', label: 'GitHub', url: 'https://github.com/sibap-dev' },
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/siba-prasad-padhi-197b61320/' },
    { platform: 'email', label: 'Email', url: 'mailto:sibapra729@gmail.com' },
  ],
}

export default function HeroEditor() {
  const { data, loading, saving, save } = useFirestoreDoc('hero')
  const [form, setForm] = useState(DEFAULT_HERO)
  const { upload: uploadImage, uploading: uploadingImage, progress: progressImage } = useFileUpload()
  const { upload: uploadResume, uploading: uploadingResume, progress: progressResume } = useFileUpload()
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [dragIndex, setDragIndex] = useState(null)
  const { isAuthorized } = useAuth()

  const moveGallery = (from, to) => {
    if (to < 0 || to >= form.gallery.length) return
    setForm((f) => {
      const items = [...f.gallery]
      const [moved] = items.splice(from, 1)
      items.splice(to, 0, moved)
      return { ...f, gallery: items }
    })
  }

  useEffect(() => {
    if (data) setForm({ ...DEFAULT_HERO, ...data })
  }, [data])

  const handleSave = async () => {
    setSaveError(null)
    const ok = await save(form)
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
    else setSaveError('Save failed. Image may be too large — try a smaller file.')
  }

  const addSocial = () => {
    setForm((f) => ({
      ...f,
      socialLinks: [...f.socialLinks, { platform: '', label: '', url: '' }],
    }))
  }

  const updateSocial = (i, field, value) => {
    setForm((f) => {
      const links = [...f.socialLinks]
      links[i] = { ...links[i], [field]: value }
      return { ...f, socialLinks: links }
    })
  }

  const removeSocial = (i) => {
    setForm((f) => ({ ...f, socialLinks: f.socialLinks.filter((_, idx) => idx !== i) }))
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
          <h2 className="text-2xl font-bold font-display text-white">Hero Section</h2>
          <p className="text-sm text-gray-400 mt-1">Edit your hero/banner content</p>
          {!isAuthorized && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full w-fit">
              <Eye className="w-3 h-3" /> Read-only view
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {saveError && (
            <span className="text-xs text-red-400 text-center sm:text-left">{saveError}</span>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={!isAuthorized || saving || uploadingImage || uploadingResume}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00B4D8] via-[#9B59B6] to-[#FF6B6B] text-white rounded-xl font-medium text-sm disabled:opacity-50 shadow-lg shadow-[#00B4D8]/20 hover:shadow-[#00B4D8]/30 transition-shadow"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : saved ? 'Saved!' : isAuthorized ? 'Save Changes' : 'Viewing (read-only)'}
          </motion.button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#00B4D8]" /> Basic Info
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Tagline / Description</label>
              <textarea rows={3} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all resize-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Badge Text</label>
              <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Subtitle Prefix</label>
                <input value={form.subtitlePrefix} onChange={(e) => setForm({ ...form, subtitlePrefix: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Resume / CV</label>
                <div className="flex gap-2">
                  <input value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                    readOnly={form.resumeUrl?.startsWith('data:')}
                    className="flex-1 min-w-0 px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all"
                    placeholder="PDF URL" />
                  <label className="cursor-pointer px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0">
                    {uploadingResume ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span className="hidden sm:inline">{uploadingResume ? `${Math.round(progressResume)}%` : 'Upload'}</span>
                    <input type="file" accept=".pdf,application/pdf" onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const url = await uploadResume(file)
                      if (url) setForm((f) => ({ ...f, resumeUrl: url }))
                    }} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <AtSign className="w-4 h-4 text-[#00B4D8]" /> Profile Image
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {form.profileImage && (
              <img src={form.profileImage} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-white/10 ring-2 ring-white/5 shrink-0" />
            )}
            <div className="flex flex-1 w-full gap-2">
              <label className="cursor-pointer px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 shrink-0">
                {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <span className="hidden sm:inline">{uploadingImage ? `${Math.round(progressImage)}%` : 'Upload'}</span>
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const url = await uploadImage(file)
                  if (url) setForm((f) => ({ ...f, profileImage: url }))
                }} className="hidden" />
              </label>
              <input value={form.profileImage} onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                readOnly={form.profileImage?.startsWith('data:')}
                className="flex-1 min-w-0 px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all"
                placeholder="Or paste image URL..." />
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#00B4D8]" /> Gallery Images
          </h3>
          <p className="text-xs text-gray-500 mb-4">Additional images for the swipeable gallery in the expanded photo viewer.</p>
          {form.gallery.length > 0 && (
            <div className="space-y-2 mb-4">
              {form.gallery.map((url, i) => (
                <div
                  key={i}
                  draggable
                  onDragStart={() => setDragIndex(i)}
                  onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move' }}
                  onDrop={(e) => { e.preventDefault(); if (dragIndex !== null && dragIndex !== i) moveGallery(dragIndex, i); setDragIndex(null) }}
                  onDragEnd={() => setDragIndex(null)}
                  className={`flex items-center gap-3 p-2 rounded-xl border transition-all ${
                    dragIndex === i ? 'opacity-40 border-white/20' : 'border-white/[0.06] hover:border-white/[0.15]'
                  } bg-white/[0.02]`}
                >
                  <img src={url} alt="" className="w-14 h-10 rounded-lg object-cover border border-white/10 shrink-0" />
                  <span className="text-xs text-gray-500 flex-1 truncate">Image {i + 1}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveGallery(i, i - 1)} disabled={i === 0}
                      className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed">
                      <ArrowUp size={14} />
                    </button>
                    <button onClick={() => moveGallery(i, i + 1)} disabled={i === form.gallery.length - 1}
                      className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed">
                      <ArrowDown size={14} />
                    </button>
                    <button onClick={() => setForm((f) => ({ ...f, gallery: f.gallery.filter((_, idx) => idx !== i) }))}
                      className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all ml-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
            {uploadingGallery ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>{uploadingGallery ? 'Uploading...' : 'Add Image'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              setUploadingGallery(true)
              const url = await uploadImage(file)
              if (url) setForm((f) => ({ ...f, gallery: [...f.gallery, url] }))
              setUploadingGallery(false)
              e.target.value = ''
            }} />
          </label>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#00B4D8]" /> Subtitle Typing Words
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {form.subtitleWords.map((word, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/[0.05] rounded-lg text-sm text-gray-300 border border-white/10">
                {word}
                <button onClick={() => {
                  const words = form.subtitleWords.filter((_, idx) => idx !== i)
                  setForm({ ...form, subtitleWords: words })
                }} className="text-gray-500 hover:text-red-400 ml-1 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            placeholder="Type a word and press Enter to add..."
            className="w-full px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value) {
                setForm({ ...form, subtitleWords: [...form.subtitleWords, e.target.value] })
                e.target.value = ''
              }
            }}
          />
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00B4D8]" /> Social Links
            </h3>
            <motion.button whileHover={{ scale: 1.05 }} onClick={addSocial}
              className="text-xs text-[#00B4D8] hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-[#00B4D8]/10">
              <Plus className="w-3 h-3" /> Add
            </motion.button>
          </div>
          <div className="space-y-3">
            {form.socialLinks.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-6">No social links yet. Click "Add" to create one.</p>
            )}
            {form.socialLinks.map((link, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center p-3 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                <input value={link.platform} onChange={(e) => updateSocial(i, 'platform', e.target.value)}
                  placeholder="Platform (github/linkedin/email)"
                  className="flex-1 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
                <input value={link.label} onChange={(e) => updateSocial(i, 'label', e.target.value)} placeholder="Label"
                  className="flex-1 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
                <input value={link.url} onChange={(e) => updateSocial(i, 'url', e.target.value)} placeholder="URL"
                  className="flex-[2] px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
                <button onClick={() => removeSocial(i)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}