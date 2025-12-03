import React from 'react'

export default function Alert({ type = 'info', children, className = '' }) {
  const styles = {
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    error: 'bg-red-50 text-red-700 border border-red-200',
  }
  const cls = styles[type] || styles.info
  return (
    <div className={`rounded-md px-3 py-2 text-sm ${cls} ${className}`}>{children}</div>
  )
}
