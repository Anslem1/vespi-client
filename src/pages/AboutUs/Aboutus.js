import React from 'react'
import './Aboutus.css'

function Aboutus () {
  return (
    <>
      <div className='about-container'>
        <div>
          <p className='about-vespi'>
            <strong>Vespi</strong> is a fasion blog application where users can
            create account, update account, delete account. Users can also make
            posts, edit posts, post by a category, delete nad update their
            posts. Users cannot edit or delete other users account or posts.
          </p>
        </div>
      </div>
      <p className='by'>Developed by Chidiebube</p>
    </>
  )
}

export default Aboutus
