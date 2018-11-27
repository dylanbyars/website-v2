import React from 'react'

export default () => (
  <div className="flex flex-col w-1/2">
    <div className="flex h-64 items-end">
      <div className="h-12 w-5 bg-grey-light rounded-sm mx-px" />
      <div className="h-10 w-5 bg-red-lighter rounded-sm mx-px" />
      <div className="h-6 w-16 bg-teal-lightest rounded-sm mx-px" />
      <div className="h-10 w-8 bg-orange-lighter rounded-sm mx-px" />
      <div className="h-12 w-6 bg-blue-lighter rounded-sm mx-px" />
    </div>
    <div className="flex flex-col items-end">
      <div className="h-12 w-5 bg-grey-light rounded-sm mx-px" />
      <div className="h-10 w-5 bg-red-lighter rounded-sm mx-px" />
    </div>
  </div>
)
