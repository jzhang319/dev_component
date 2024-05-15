import React from 'react'
import {ArrowDropDownCircleIcon} from '../../exports'
const CustomSelect = ({idType, onCLick, Icon1, Icon2, text, className}) => {


  return (
    <div className='customSelect'>
      <button
      as='label'
      htmlFor={idType}
      cursor='pointer'
      onClick={onCLick}
      className={`customSelect__button ${className}`}
      >

        <div className="customSelect__button--container">
          {Icon1}
          <p className="customSelect__button--innerText">{text}</p>
          {/* <ArrowDropDownCircleIcon style={{fontSize:'1.6rem'}} className='customSelect__button--icon'/> */}
          {Icon2}
        </div>
      </button>
    </div>
  )
}

export default CustomSelect
