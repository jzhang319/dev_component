import React, {useState} from 'react'
import {AddIcon ,ArrowDownwardIcon, ArrowForwardIcon, List, ButtonL } from '../../exports'
import CreateComponentRender from '../createComponent/CreateComponentRender';
const Sidebar = () => {
  const something = (e) => {
    e.preventDefault()
    alert('helooo')
  }
  return (
    <div className="sidebar absolute flex-col h-full w-1/5 mt-25 z-50">
      <div className="sidebar__wrapper mt-8">
        <List text="Getting Started" />
        <List text="Components" />
        <List text="My Components" />
        <List text="Liked Components"/>
        <CreateComponentRender/>
        {/* <ButtonL Icon = {<AddIcon style={{fontSize:'2rem', marginRight:'.5rem'}}/>} className='sidebar__button' text='create component'/> */}
      </div>
    </div>
  );
};

export default Sidebar;
