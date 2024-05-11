import React, {useState, useContext} from 'react'
import { Modal } from '../../context/Modal2'
import { useSelector } from 'react-redux'
import {ButtonL, AddIcon} from '../../exports'
import CreateComponent from './CreateComponent'

const CreateComponentRender = () => {
  const [showModal, setShowModal] = useState(false)
  const sessionUser = useSelector(state => state.session.user)

  const something = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <div>
      <ButtonL
      text='Create Component'
      Icon={<AddIcon
      style={{fontSize:'2rem', marginRight:'.5rem'}}/>}
      className='sidebar__button'
      onClick={something}
      />
    {/* <button style={{border:'none', backgroundColor:'transparent'}}onClick={() => setShowModal(true)}>

    <div className="shareOption">
    <span className={ 'shareOptionText' }>Photos</span>

    </div>

    </button> */}
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <CreateComponent
        setModal={setShowModal}
        />
      </Modal>
    )}
  </div>
  )
}

export default CreateComponentRender
