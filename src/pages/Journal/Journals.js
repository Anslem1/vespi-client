import React, { useState, useEffect } from 'react'
import Alljournals from './Journal-page/Alljournals'
import { useDispatch, useSelector } from 'react-redux'

function Journals () {
  const [journal, setJournal] = useState([])

  const post = useSelector(state => state.post)
  useEffect(() => {
    function fetchJournal () {
      setJournal(post.posts)
    }
    fetchJournal()
  }, [post])

  return <Alljournals  journal={journal} />
}

export default Journals
