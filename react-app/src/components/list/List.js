import React , {useState}from 'react'
import { ArrowDownwardIcon, ArrowForwardIcon } from '../../exports'

const List = ({text}) => {

  const [show, setShow] = useState(false)
  const something = (e) => {
    // e.preventDefault()
    alert('helooo')
  }
  return (
    <div className='list'>
      <div className="list__wrapper">

        {show ?
          <div className='list__toggle'
          onClick={() =>setShow(false)}>
            <ArrowDownwardIcon className='list__icon' style={{fontSize: '2rem'}}/>
            <span className="list__button" >{text}</span>
          </div>
          :
        <div className='list__toggle'  onClick={() => setShow(true)}>
          <ArrowForwardIcon className='list__icon' style={{fontSize: '2rem'}}/>
          <span className="list__button" >{text}</span>
        </div>
        }
      </div>
    </div>
  )
}

export default List
