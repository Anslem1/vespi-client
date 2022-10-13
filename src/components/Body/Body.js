import React from 'react'
import { nanoid } from 'nanoid'
import BodyData from './bodyData'
import './Body.css'
import Footer from '../Footer/Footer'
import Bottombody from './bottomBody/Bottombody'
function Body () {
  const bodyElement = BodyData.map(body => {
    return (
      <>
        <div className='image-container'>
          <img src={body.image} key={body.image} className='image' />
          <div className='posted-under-container'>
            <h2 className='image-text' key={body.heading}>
              {body.heading}
            </h2>
            <p key={body.text}>{body.text}</p>
            {body.postedUnder}
          </div>
        </div>
      </>
    )
  })

  return (
    <main className='content-container'>
      <div className='intro-text-container'>
        <h1 className='intro-text'>Latest Happenings</h1>
      </div>
      <div className='body-container'>{bodyElement}</div>
      <Bottombody />
      <Footer />
    </main>
  )
}

export default Body
