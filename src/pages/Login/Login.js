import { Link, Navigate, Route } from 'react-router-dom'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { isUserLoggedin } from '../../Redux/Actions'
import { LoginUser } from '../../Redux/Actions'

function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!auth.authenticate) {
  //     dispatch(isUserLoggedin())
  //   }
  // }, [])
  function UserLogin (e) {
      try {
      e.preventDefault()
      const user = {
        username,
        password
      }
      dispatch(LoginUser(user))
    } catch (error) {
      setError(true)
    }
    }

  if (auth.authenticate) {
    return <Navigate replace={true} to='/' />
  }

  return (
    <>
      <div className='login-container'>
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
        {error && <h3 className='error'>Wrong unsername or password</h3>}
      </div>
    </>
  )
}

export default Login
