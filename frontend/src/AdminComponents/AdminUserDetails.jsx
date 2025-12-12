import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminUserDetails({ user, onClose }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (!user) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [user])

  const overlay = (
    <AnimatePresence>
      {user && (
        <motion.div className="fixed inset-0 z-[1000] grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* Backdrop sits under the card; keep pointer events for click-to-close */}
          <div className="absolute inset-0 z-[1000] bg-black/30" onClick={onClose} />
          <motion.div
            className="relative z-[1001] w-[95%] max-w-lg max-h-[80vh] overflow-auto rounded-2xl bg-white text-gray-900 shadow-2xl ring-1 ring-black/10"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="heading-3">User Details</h2>
                <button className="btn" onClick={onClose}>Close</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm muted">Username</div>
                  <div className="font-semibold">{user.username}</div>
                </div>
                <div>
                  <div className="text-sm muted">Phone</div>
                  <div className="font-semibold">{user.phone || '—'}</div>
                </div>
                <div>
                  <div className="text-sm muted">Driver</div>
                  <div className="font-semibold">{user.isDriver ? 'Active' : 'Inactive'}</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-sm muted">ID</div>
                  <div className="font-mono text-sm">{user.id || user._id}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(overlay, document.body)
}
