import React from 'react'

const ButtonLarge = ({text, className, Icon, onClick}) => {
  return (
    <div className='buttonLarge'>
      {Icon? (
        <div className='buttonLarge__icon' onClick={onClick}>
          <button className={`buttonLarge__button ${className}`}><span>{Icon}{text}</span></button>
        </div>
      )
      :(
        <button className={`buttonLarge__button ${className}`}>{text}</button>
      )
      }
    </div>
  )
}

export default ButtonLarge
