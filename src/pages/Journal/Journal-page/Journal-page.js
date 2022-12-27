import React from 'react'
import { Link } from 'react-router-dom'
import './Journal-page.css'

function Journalpage ({ journal }) {

  return (
    <>
      <div className='journal-container'>
        <Link to={`/journalarticle/${journal._id}`} className='link'>
          {journal.postImage && (
            <img src={journal.postImage} alt='' className='journal__img' />
          )}

          <h2 className='journal-heading'>{journal.caption}</h2>
          <p className='journal-text'>{journal.desc}</p>
        </Link>
        <h5 className='posted-under-journal'>
          Posted under
          <span className='under-journal'>{journal.category.name}</span>
        </h5>
      </div>
    </>
  )
}

export default Journalpage
