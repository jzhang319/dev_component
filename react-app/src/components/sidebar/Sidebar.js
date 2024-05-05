import React, {useState} from 'react'
import { ArrowDownwardIcon, ArrowForwardIcon, List } from '../../exports'

const Sidebar = () => {

  return (
    <div className="sidebar absolute flex-col h-full w-1/5 mt-25 z-50">
      <div className="sidebar__wrapper mt-8">
        <List text="Getting Started" />
        <List text="Components" />
        <List text="My Components" />
        <List text="Liked Components" />
      </div>
    </div>
  );
};

export default Sidebar;
