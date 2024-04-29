import React , {useState}from 'react'
import { ArrowDownwardIcon, ArrowForwardIcon } from '../../exports'

const List = ({text}) => {

  const [show, setShow] = useState(false)

  return (
    <div className='list'>
      <div className="list__wrapper">

        {show ?
          <div className='list__toggle' >
            <ArrowDownwardIcon className='list__icon' style={{fontSize: '2rem'}}/>
            <span className="list__button"  onClick={() => setShow(false)}>{text}</span>
          </div>
          :
        <div className='list__toggle' >
          <ArrowForwardIcon className='list__icon' style={{fontSize: '2rem'}}/>
          <span className="list__button"  onClick={() => setShow(true)}>{text}</span>
        </div>
        }
      </div>
    </div>
  )
}

export default List
