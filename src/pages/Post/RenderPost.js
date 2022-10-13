import React from 'react'

import { Navigate } from 'react-router-dom'
import Post from './createPost/Post'

function RenderPost () {
  const token = window.localStorage.getItem('token')

  if (token) {
    return <Post />
  } else {
    return <Navigate replace to='/login' />
  }

  return
}

export default RenderPost
