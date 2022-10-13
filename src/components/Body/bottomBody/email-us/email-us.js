import React from 'react'

function emailUs () {
  return (
    <div className='email-us'>
      <div className='email-text'>
        <h5>
          <i className='fa-solid fa-face-smile'></i>
          We also take emails
        </h5>
        <p>
          Recieve updates and offers you’ll actually be interested in.
          <br /> Unsubscribe any time.
        </p>
      </div>
      <input
        type='email'
        className='email-input'
        placeholder='Your Email'
        size='20'
      />
    </div>
  )
}

export default emailUs
