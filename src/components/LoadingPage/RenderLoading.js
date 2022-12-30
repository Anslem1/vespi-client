import React from 'react'
import { useSelector } from 'react-redux'
import LoadingPage from './LoadingPage'

function RenderLoading () {
  const auth = useSelector(state => state.auth)
  const user = useSelector(state => state.user)

  return (auth.authenticating || user.registering) && <LoadingPage />
}

export default RenderLoading
