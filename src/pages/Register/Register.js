import { useState } from 'react'

import { Navigate } from 'react-router-dom'
import './Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../Redux/Actions'
// import { isUserLoggedin } from '../../Redux/Actions'

function Register () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const auth = useSelector(state => state.auth)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  async function UserRegister (e) {
    e.preventDefault()

    const user = {
      username,
      email,
      password
    }
    try {
      dispatch(register(user))
      // window.location.replace('/login')
    } catch (err) {
      setError(true)
    }
  }

  if (auth.authenticate) {
    return <Navigate replace={true} to='/' />
  }

  return (
    <>
      <form action='' onSubmit={UserRegister} className='register-container'>
        <h1 className='register-header'>Register</h1>
        <div className='register-details'>
          <h3 className='register-text'>Username</h3>
          <input
            type='text'
            name=''
            placeholder='e.g Yagami'
            value={username}
            className='register register_username'
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='register-details'>
          <h3 className='register-text'>Email</h3>
          <input
            type='email'
            placeholder='e.g Yagami@info.com'
            name=''
            value={email}
            className='register register_email'
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='register-details'>
          <h3 className='register-text'>Password</h3>
          <input
            type='password'
            placeholder='Password'
            name=''
            value={password}
            className='register register_password'
            required
            onChange={e => setPassword(e.target.value)}
          />
          <button className='register_btn'>Register</button>
        </div>
        {user.error && <h3 className='error'>{user.error}</h3>}
      </form>
    </>
  )
}

export default Register
