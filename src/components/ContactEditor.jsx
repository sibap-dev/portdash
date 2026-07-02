import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Check, Loader2, Mail, MapPin, Link2, ExternalLink, Eye } from 'lucide-react'
import { useFirestoreDoc } from '../hooks/useFirestoreDoc'
import { useAuth } from '../contexts/AuthContext'

const DEFAULT_CONTACT = {
  email: 'sibapra729@gmail.com',
  location: 'Bhubaneswar, India',
  locationUrl: 'https://maps.google.com/?q=Bhubaneswar,+India',
  emailDescription: "I'll respond within 24 hours",
  locationDescription: 'Open for remote opportunities',
  socialLinks: [
    { platform: 'github', url: 'https://github.com/sibap-dev', label: 'GitHub' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/siba-prasad-padhi-197b61320/', label: 'LinkedIn' },
    { platform: 'email', url: 'mailto:sibapra729@gmail.com', label: 'Email' },
  ],
}

export default function ContactEditor() {
  const { data, loading, saving, save } = useFirestoreDoc('contact')
  const [form, setForm] = useState(DEFAULT_CONTACT)
  const [saved, setSaved] = useState(false)
  const { isAuthorized } = useAuth()

  useEffect(() => {
    if (data) setForm({ ...DEFAULT_CONTACT, ...data })
  }, [data])

  const handleSave = async () => {
    const ok = await save(form)
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
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
          <h2 className="text-2xl font-bold font-display text-white">Contact Section</h2>
          <p className="text-sm text-gray-400 mt-1">Edit your contact information</p>
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
            <Mail className="w-4 h-4 text-[#00B4D8]" /> Contact Info
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Email Description</label>
                <input value={form.emailDescription} onChange={(e) => setForm({ ...form, emailDescription: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Location
                </label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Location Description</label>
              <input value={form.locationDescription} onChange={(e) => setForm({ ...form, locationDescription: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Location Link (Google Maps URL)
              </label>
              <input value={form.locationUrl || ''} onChange={(e) => setForm({ ...form, locationUrl: e.target.value })}
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <Link2 className="w-4 h-4 text-[#00B4D8]" /> Social Links (shown in contact section)
          </h3>
          <div className="space-y-3">
            {form.socialLinks.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-6">No social links configured.</p>
            )}
            {form.socialLinks.map((link, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center p-3 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                <input value={link.platform} onChange={(e) => {
                  const links = [...form.socialLinks]
                  links[i] = { ...links[i], platform: e.target.value }
                  setForm({ ...form, socialLinks: links })
                }} placeholder="Platform"
                  className="flex-1 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
                <input value={link.label} onChange={(e) => {
                  const links = [...form.socialLinks]
                  links[i] = { ...links[i], label: e.target.value }
                  setForm({ ...form, socialLinks: links })
                }} placeholder="Label"
                  className="flex-1 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
                <input value={link.url} onChange={(e) => {
                  const links = [...form.socialLinks]
                  links[i] = { ...links[i], url: e.target.value }
                  setForm({ ...form, socialLinks: links })
                }} placeholder="URL"
                  className="flex-[2] px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm focus:border-[#00B4D8] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]/30 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}