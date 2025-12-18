import React from 'react'
import PageTransition from '../components/PageTransition'
import Text from '../components/Text.jsx'
import AboutContent from '../components/AboutContent.jsx'
import Client from '../components/Client.jsx'

function About() {
  return (
    <PageTransition>
      <div className='container py-10'>
        <AboutContent />
        <Client/>
      </div>
    </PageTransition>
  )
}

export default About