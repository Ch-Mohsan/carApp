import React from 'react'

// Accept a prop named "Text" and render its string value.
// Fixes runtime error caused by rendering the entire props object.
function Text({ Text: label, Path:path }) {
  let alph=">";
  return (
    <div className='w-[300px]  py-8 px-4'>
     <div className='text-lg text-white py-4'> <a href="/" >Home {alph} </a> <a href={label}>{label.toUpperCase()}</a></div>
      <h1 className='text-4xl font-semibold leading-9 text-white'>Our {label.toUpperCase()}</h1>

    </div>
  )
}

export default Text