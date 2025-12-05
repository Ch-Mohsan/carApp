import React from 'react'
import PageTransition from '../components/PageTransition'
import BlogSection from '../components/Blog'

function BlogPage() {
  return (
    <PageTransition>
      <div className='container py-10'>
        <BlogSection/>
      </div>
    </PageTransition>
  )
}

export default BlogPage