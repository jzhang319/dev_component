import React, {useState} from 'react'
import {addComponentThunk} from '../../store/component'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'

const CreateComponent = () => {
  const sessionUser = useSelector(state => state.session.user)

   const [type, setType] = useState('')
   const [code, setCode] = useState('')
   const [image, setImage] = useState('')
  //  const [first, setfirst] = useState('')
  return (
    <div className='createComponent'>
      <div className="createComponent__wrapper">

        <div className="createComponent__title">
          <h1 className="logo1">Dev</h1>
          <h1 className="logo2">Component</h1>
        </div>

        <div className="createComponent__userInfo">
          <Avatar className='createComponent__avatar' src='images/me.jpg'/>
          <h3 className="createComponent__username">{sessionUser?.username}</h3>
        </div>

        <div className="createComponent__formField">
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
