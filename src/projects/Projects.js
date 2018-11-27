import React from 'react'
import Link from 'gatsby-link'

import PeriodicTable from './thumbnails/PeriodicTableThumbnail'

export default () => (
  <div>
    <h1>Projects</h1>
    <div className="flex justify-around">
      <PeriodicTable />
    </div>
    <Link to="/periodic-table">Periodic Table App</Link>
  </div>
)
