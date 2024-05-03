import React from 'react'
import { LeftBar, Feed, ChatBar } from '../../exports'

const Home = () => {
  return (
    <div className='home flex flex-grow w-full'>
      <LeftBar/>
      <Feed />
      <ChatBar/>
    </div>
  )
}

export default Home
