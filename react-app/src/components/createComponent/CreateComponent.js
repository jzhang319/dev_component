import React, {useState} from 'react'
import {addComponentThunk} from '../../store/component'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'
import {CloseIcon} from '../../exports'

const CreateComponent = ({setModal}) => {
  const sessionUser = useSelector(state => state.session.user)

   const [type, setType] = useState('')
   const [code, setCode] = useState('')
   const [image, setImage] = useState('')

   const updateCode = (e) => setCode(e.values.target)
   const updateType = (e) => setType(e.values.target)
   const updateImage = (e) => setImage(e.values.target)

   const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      user_id: sessionUser.id,
      type: type,
      code: code,
    }


   }
  return (
    <div className='createComponent'>


        <center>
          <div className="createComponent__title">
            <div className="createComponent__title--logo">
              <h1 className="logo1">Dev</h1>
              <h1 className="logo2">Component</h1>
            </div>
            <button
            className='createComponent__button--closing'
            onClick={() => setModal(false)}>
              <CloseIcon
               className='createComponent__button--closing-icon'
               style={{fontSize:'3rem'}}
               /></button>
          </div>
        </center>

        <div className="createComponent__userInfo">

          <div className="createComponent__userInfo--container">
            <h3 className="createComponent__username">{sessionUser?.username}</h3>
            <Avatar className='createComponent__avatar' src='images/me.jpg'/>
          </div>
        </div>



        <div className="createComponent__formField">
          <form action="" className="createComponent__form">
            {/* <input
            type="text"
            name=""
            id=""
            className="createComponent__input"
            placeholder='Enter React Code'
            /> */}

            <textarea placeholder ='Enter React Code...'name="" id="" className="createComponent__textArea">

            </textarea>
          <div className="createComponent__choices">

            <select name="" id="" className="createComponent__select">
              <option disabled value="">Select Type</option>
              <option value="">Navbar</option>
              <option value="">Header</option>
              <option value="">Footer</option>
              <option value="">Button</option>
            </select>

            <textarea placeholder ='Enter CSS Code...'name="" id="" className="createComponent__textArea">

            </textarea>
          </div>

            <button type="submit" className="createComponent__button--submit">Create Component</button>
          </form>
        </div>
    </div>
  )
}

export default CreateComponent
