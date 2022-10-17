import React from 'react'
import './Aboutus.css'

function Aboutus () {
  return (
    <>
      <h1 className='about-us-header'>Vespi</h1>
      <p className='about-vespi'>Vespi is a fashion blog application</p>
      <div className='about-container'>
        <div>
          <h2 className='about-us-header functions'>Functionalities</h2>
          <p className='about-us-header '>User can register</p>
          <p className='about-us-header'>
            User can get registered data from the database to login
          </p>
          <p className='about-us-header '>User can edit profile</p>
          <p className='about-us-header '>Users can create posts</p>
          <p className='about-us-header '>Users can edit posts</p>
          <p className='about-us-header '>Users can delete posts</p>
          <p className='about-us-header '>
            Users can get posts by a particular user
          </p>
        </div>
      </div>
      <p className='by'>Developed by Chidiebube</p>
    </>
  )
}

export default Aboutus
