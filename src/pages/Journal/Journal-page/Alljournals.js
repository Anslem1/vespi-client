import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer/Footer'
import Journalpage from './Journal-page'
import './Journal.css'

function Journal ({ journal }) {
  return (
    <>
      <h1 className='heading-text'>Journal</h1>
      <div className='journal-content'>
        {journal.map(journal => {
          return <Journalpage journal={journal} key={journal._id} />
        })}
      </div>

      <Footer />
    </>
  )
}

export default Journal
