import React from 'react'
import PageTransition from '../components/PageTransition'
import Text from '../components/Text.jsx'
import AboutContent from '../components/AboutContent.jsx'

function About() {
  return (
    <PageTransition>
      <div className='w-full mb-18'>
        <AboutContent />
      </div>
    </PageTransition>
  )
}

export default About