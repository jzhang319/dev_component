import React, {useState} from 'react'
import {addComponentThunk} from '../../store/component'
import './_CreateComponent.scss'
import { useSelector } from 'react-redux'
const CreateComponent = () => {

   const [type, setType] = useState('')
   const [c, setC] = useState('')
   const [i, setI] = useState('')
   const [first, setfirst] = useState('')
  return (
    <div className='createComponent'>
      <div className="createComponent__wrapper">

        <div className="createComponent__title">
          <h1 className="createComponent__logo1">Dev</h1>
          <h1 className="createComponent__logo2">Component</h1>
        </div>

        <div className="createComponrnt__formField">
          <form action="" className="createComponent__form">
            <input
            type="text"
            name=""
            id=""
            className="createComponent__input"
            />

            <select name="" id="" className="createComponent__select">
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
            </select>

            <textarea name="" id="" className="createComponent__textArea">

            </textarea>

            <button type="submit" className="createComponent__button--submit">Creatr Component</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateComponent
