import React from 'react'

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

  return (
    <div className='w-[300px]  py-8 '>
      <div className='text-lg text-white py-4'>
        <a href='/home'>Home {alph} </a>
        {path ? <a href={path}>{crumbLabel}{alph}</a> : null}
      </div>
      <h1 className='text-4xl font-semibold leading-9 text-white'> {heading}</h1>

    </div>
  )
}

export default Text