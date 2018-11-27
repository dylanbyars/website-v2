import React from 'react'

import Header from '../components/Header'
import Projects from '../projects/Projects'
import Resume from '../components/Resume'

export default () => (
  <div className="flex flex-col px-4 md:px-8 w-full">
    <Header />
    <Projects />
    <Resume />
  </div>
)
