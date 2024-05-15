import React, {useState} from 'react'
import {addComponentThunk} from '../../store/component'
import { useSelector } from 'react-redux'
import {ArrowCircleUpIcon,ArrowCircleDownIcon, CloseIcon, Avatar, CustomSelect, CheckCircleIcon} from '../../exports'
import {useModal} from '../../context/Modal'

const CreateComponent = () => {
  const sessionUser = useSelector(state => state.session.user)

   const [type, setType] = useState('')
   const [code, setCode] = useState('')
   const [image, setImage] = useState('')
   const [showTypes, setShowTypes] = useState(false)
   const {closeModal} = useModal()

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
            onClick={closeModal}>
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

            <div className="createComponent__choices">

            <select hidden id="selectType" className="createComponent__select" value={type} onChange={updateType}>
            </select>

            {showTypes ?
            (<>
            <div className="createComponent__items">
              <button className="cancel" onClick={() => setShowTypes(false)}>
                <span className="cancel__text">
                  <CheckCircleIcon style={{fontSize:'2rem'}}/>
                  Cancel
                  <ArrowCircleUpIcon style={{fontSize:'2rem'}}/>
                  </span>
              </button>
              <button className="createComponent__items--item" onClick={() => setShowTypes(false)}>
                <span className="createComponent__items--item-text" onClick={() => setType('Button')}>Buttons</span>
              </button>

              <button className="createComponent__items--item" onClick={() => setShowTypes(false)}>
                <span className="createComponent__items--item-text" onClick={() => setType('Card')}>Card</span>
              </button>

              <button className="createComponent__items--item" onClick={() => setShowTypes(false)}>
                <span className="createComponent__items--item-text" onClick={() => setType('Feed')}>Feed</span>
              </button>

              <button className="createComponent__items--item" onClick={() => setShowTypes(false)}>
                <span className="createComponent__items--item-text" onClick={() => setType('Footer')}>Footer</span>
              </button>

              <button className="createComponent__items--item" onClick={() => setShowTypes(false)}>
                <span className="createComponent__items--item-text" onClick={() => setType('Header')}>Header</span>
              </button>

              <button className="createComponent__items--item" onClick={() => setShowTypes(false)}>
                <span className="createComponent__items--item-text" onClick={() => setType('Navbar')}>Navbar</span>
              </button>

              <button className="createComponent__items--item" onClick={() => setShowTypes(false)}>
                <span className="createComponent__items--item-text" onClick={() => setType('Sidebar')}>Sidebar</span>
              </button>
            </div>
            </>)

            :(<>
            <CustomSelect
            idType='selectType'
            className='createComponent__customSelect'
            onCLick={() => setShowTypes(true)}
            Icon1={<CheckCircleIcon
              style={
                {fontSize:'2rem',
                color:'white'}}

                />}
            Icon2={<ArrowCircleDownIcon style={{fontSize:'2rem'}}/>}
            text={type ? type : 'Code Type'}
            />
            </>)}
            <textarea placeholder ='Enter React Code...'name="" id="" className="createComponent__textArea ">

            </textarea>
          </div>



            <textarea placeholder ='Enter CSS Code...'name="" id="" className="createComponent__textArea createComponent__textArea--second">
            </textarea>

            <button type="submit" className="createComponent__button--submit">Create Component</button>
          </form>
        </div>
    </div>
  )
}

export default CreateComponent
