import React from 'react'
import {List} from '../../exports'
import { ArrowDownwardIcon, ArrowForwardIcon } from '../../exports'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar__wrapper mt-8">
        <List text='Getting Started'/>
        <List text='Components'/>
      </div>
    </div>
  )
}

export default Sidebar
