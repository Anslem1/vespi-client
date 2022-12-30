import { Link, Navigate, Route, useLocation, useParams } from 'react-router-dom'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { isUserLoggedin } from '../../Redux/Actions'
import { LoginUser } from '../../Redux/Actions'
import RenderLoading from '../../components/LoadingPage/RenderLoading'

function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch()
  function UserLogin (e) {
    e.preventDefault()
    const user = {
      username,
      password
    }
    dispatch(LoginUser(user))
  }

  return (
    <>
      <div className='login-container'>
        <RenderLoading />
        <div>
          <h1 className='login-header'>Login</h1>

          <div className='login_register-conttainer'></div>
        </div>
        <form className='login-form' onSubmit={UserLogin}>
          <div className='login-details'>
            <h3 className='login-text'>Username</h3>
            <input
              type='text'
              className='login'
              placeholder='e.g Rubberducky'
              value={username}
              required
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='login-details'>
            <h3 className='login-text'>Password</h3>
            <input
              type='password'
              className='login'
              placeholder='Password'
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className='login_btn'>Login</button>
        </form>
        {auth.error === 'Account updated Succesfully'
          ? null
          : auth.error && <h3 className='error'>{auth.error}</h3>}
      </div>
    </>
  )
}

export default Login
