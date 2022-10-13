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
          <p className='about-us-header '>Users can delete account</p>
          <p className='about-us-header '>Users can create posts</p>
          <p className='about-us-header '>Users can edit posts</p>
          <p className='about-us-header '>Users can delete posts</p>
          <p className='about-us-header '>
            Users can get posts by a particular user
          </p>
        </div>

        <div>
          <h2 className='about-us-header functions'>Side note</h2>
          <p className='about-us-header '>
            The welcome page is for UI purposes, no functionalities
          </p>
          <p className='about-us-header '>
            Men page is for UI purposes, no functionality
          </p>
          <p className='about-us-header '>
            Women page is for UI purposes, no functionality
          </p>
        </div>
      </div>
      <p className='by'>Developed by Chidiebube</p>
    </>
  )
}

export default Aboutus
