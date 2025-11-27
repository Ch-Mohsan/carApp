import React from 'react'

// Accept a prop named "Text" and render its string value.
// Fixes runtime error caused by rendering the entire props object.
function Text({ Text: label }) {
  return (
    <div className='w-[300px] h-[300px] py-8 px-4'>
      <h1 className='text-2xl font-bold text-white'>Our {label}</h1>
    </div>
  )
}

export default Text