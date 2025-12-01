import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from './animations'

// Props
// - Path: href for breadcrumb link (e.g., '/about')
// - Text: big heading text (e.g., 'Our Services')
// - Crumb (optional): breadcrumb label; if not provided, derived from Path
function Text({ Path: path, Text: heading, Crumb }) {
  const alph = '>'

  const deriveCrumbFromPath = (p) => {
    if (!p) return ''
    const last = p.replace(/^\//, '').split('/').pop()
    return last.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  }

  const crumbLabel = (Crumb && Crumb.trim().length > 0)
    ? Crumb.replace(/\b\w/g, (c) => c.toUpperCase())
    : deriveCrumbFromPath(path)

  const words = String(heading || '').split(/\s+/)
  return (
    <motion.div
      className='w-[300px] py-8'
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div className='text-lg text-white py-4' variants={fadeUp}>
        <a href='/home'>Home {alph} </a>
        {path ? <a href={path}>{crumbLabel}{alph}</a> : null}
      </motion.div>
      <motion.h1 className='text-4xl font-semibold leading-9 text-white'>
        {words.map((w, i) => (
          <motion.span key={i} className='inline-block mr-2' variants={fadeUp}>
            {w}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  )
}

export default Text