import React from 'react'

import { Icon } from 'react-icons-kit'
import { git } from 'react-icons-kit/icomoon/'
import { socialJavascript, androidBoat } from 'react-icons-kit/ionicons/'
import { css3, html5, cutlery, book, birthdayCake, medkit, leaf } from 'react-icons-kit/fa/'

import A from '../components/A'

import { technology, service, outdoor } from '../resources/cv'

const Section = ({ category, jobs, children }) => (
  <div className="min-h-half mb-16 md:mb-8 md:flex">
    <div className="sticky pin-t pin-l md:h-64 flex md:flex-col pt-6 justify-end md:justify-start md:w-1/3 md:pt-8 md:pl-2">
      <h1 className="bg-indigo-lighter text-center font-light tracking-wide rounded-full py-2 px-8 shadow-lg md:mx-auto">
        {category}
      </h1>
      <div className="hidden md:flex flex-col justify-around items-center pt-12">{children}</div>
    </div>
    <div className="mt-8 md:mt-4 md:w-2/3 md:ml-auto lg:pl-8">
      {jobs.map(job => (
        <div key={job.title} className="mb-6 px-3 leading-tight font-light md:px-32 md:mb-12">
          <h3 className="mb-3">{job.title}</h3>
          <h4 className="mb-3">{job.website ? <A href={job.website}>{job.company}</A> : job.company}</h4>
          <ul>
            {job.description.map(d => (
              <li key={d.length} className="mb-2 text-xl md:text-base md:mb-4">
                {d}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
)

const ResumeLink = ({ icon }) => <Icon icon={icon} size="32" className="my-3" />

export default () => (
  <div>
    <Section category="Technology" jobs={technology}>
      <ResumeLink icon={socialJavascript} />
      <ResumeLink icon={git} />
      <ResumeLink icon={html5} />
      <ResumeLink icon={css3} />
    </Section>
    <Section category="Service" jobs={service}>
      <ResumeLink icon={cutlery} />
      <ResumeLink icon={book} />
      <ResumeLink icon={birthdayCake} />
    </Section>
    <Section category="Outdoor" jobs={outdoor}>
      <ResumeLink icon={medkit} />
      <ResumeLink icon={androidBoat} />
      <ResumeLink icon={leaf} />
    </Section>
  </div>
)
