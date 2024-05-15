import React from 'react'

const ButtonLarge = ({text, className, Icon, onClick}) => {
  return (
    <div className='buttonLarge'>
      {Icon? (
        <div className='buttonLarge__container' onClick={onClick}>
          <button className={`buttonLarge__button ${className}`}><span className='buttonLarge__button--text'>{Icon}{text}</span></button>
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
