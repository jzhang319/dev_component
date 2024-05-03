import React from 'react'
import {List} from '../../exports'
import { ArrowDownwardIcon, ArrowForwardIcon } from '../../exports'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__wrapper mt-8">
        <List text="Getting Started" />
        <List text="Components" />
        <List text="My Components" />
        <List text="Liked Components" />
      </div>
    </div>
  );
}

export default Sidebar
