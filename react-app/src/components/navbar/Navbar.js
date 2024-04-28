import React from 'react'
import './Navbar.scss'
import Avatar from '@mui/material/Avatar'
import {SearchIcon} from '../../exports'

const Navbar = ({sessionUser}) => {

  let content;

  return (
    <div className='navbar'>
      <div className="navbar__wrapper">
        <div className="navbar__left">
          <h1 className="navbar__left--logo">Dev</h1>
          <h1 className="navbar__left--logo2">Component</h1>
        </div>

        <div className="navbar__center">
          <input
          type="text"
          className="navbar__center--input"
          placeholder='Search Components Here ...'
          />

          <SearchIcon className='navbar__center--search'
          style={{fontSize: '2.5rem', fontWeight:'700'}}/>
        </div>

        <div className="navbar__right">
          {/* <span>hello</span>
          <span>hello</span> */}
          <span className='navbar__right--username'>{sessionUser?.username} Demo</span>
          <Avatar/>
        </div>
      </div>

    </div>
  )
}

export default Navbar
