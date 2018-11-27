import React from 'react'
import CellularAutomaton from './CellularAutomaton'

export default () => (
  <div className="relative">
    <div className="absolute h-full w-full flex flex-col justify-around py-24 z-10">
      <h1 className="font-db font-bold text-enormous md:ml-16 md:text-massive">Dylan Byars</h1>
      <h2 className="font-db font-light self-end text-huge md:mr-16 md:text-big">Software Developer</h2>
    </div>
    <div className="blur">
      <CellularAutomaton />
    </div>
  </div>
)
