import React, { useState, useEffect } from 'react'
import Alljournals from './Journal-page/Alljournals'

import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialData } from '../../Redux/Actions'

function Journals () {
  const [journal, setJournal] = useState([])
  const dispatch = useDispatch()
  const post = useSelector(state => state.post)
  useEffect(() => {
    function fetchJournal () {
      setJournal(post.posts)
    }
    fetchJournal()
  }, [post])

  return <Alljournals key={journal} journal={journal} />
}

export default Journals
