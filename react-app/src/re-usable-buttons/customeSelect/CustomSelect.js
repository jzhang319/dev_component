import React from 'react'
import {ArrowDropDownCircleIcon} from '../../exports'
const CustomSelect = ({idType, setShow, Icon, text}) => {

  return (
    <div className='customSelect'>
      <button
      as='label'
      htmlFor={idType}
      cursor='pointer'
      onClick={() => setShow(true)}
      className='customSelect__button'
      >

        <div className="customSelect__button--container">
          {Icon}
          <p className="customSelect__button--innerText">{text}</p>
          <ArrowDropDownCircleIcon style={{fontSize:'1.6rem'}} className='customSelect__button--icon'/>
        </div>
      </button>
    </div>
  )
}

export default CustomSelect
