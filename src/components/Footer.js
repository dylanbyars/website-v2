import React from 'react'
import { Icon } from 'react-icons-kit'
import { github, linkedin2, codepen } from 'react-icons-kit/icomoon/'

const FooterLink = ({ icon, link }) => (
  <a href={link} className="text-white trans hover:text-yellow">
    <Icon icon={icon} size="32" />
  </a>
)

export default () => (
  <div className="flex flex-col justify-around h-48 bg-blue py-6 md:px-32">
    <div className="flex justify-around items-center">
      <FooterLink link="https://github.com/dbyars/db" icon={github} />
      <FooterLink link="https://www.linkedin.com/in/dylanbyars/" icon={linkedin2} />
      <FooterLink link="https://codepen.io/dylanbyars/" icon={codepen} />
    </div>
    <small className="mx-auto tracking-wide font-hairline text-grey-lighter">&copy; 2018 Dylan Byars</small>
  </div>
)
