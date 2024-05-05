import React, {useState} from 'react'
import {List} from '../../exports'
import { ArrowDownwardIcon, ArrowForwardIcon } from '../../exports'

const Sidebar = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="sidebar">
      <div className="sidebar__wrapper mt-8">
        <List text="Getting Started" show={show} setShow={setShow}/>
        <List text="Components" shoe={show} setShow={setShow}/>
        <List text="My Components" shoe={show} setShow={setShow}/>
        <List text="Liked Components" shoe={show} setShow={setShow}/>
      </div>
    </div>
  );
}

export default Sidebar
