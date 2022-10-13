import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Navlinks () {
  const auth = useSelector(state => state.auth)
  const userCreds = localStorage.getItem('userCreds')
  const PF = 'http://localhost:5000/images/'

  return (
    <nav className='navbar-container'>
      <ul>
        <li>
          <Link to='/' className='vespi'>
            Vespi
          </Link>
        </li>
      </ul>
      <ul className='products'>
        <li>
          <Link to='/men'>Men</Link>
        </li>
        <li>
          <Link to='/women'>Women</Link>
        </li>

        <li>
          <Link to='/post'>Post</Link>
        </li>
        <li>
          <Link to='/journals'>Journal</Link>
        </li>
        <li>
          <a href='/aboutus'>About us</a>
        </li>
      </ul>
      <ul className='login-search'>
        <li>
          {userCreds === null ? (
            <li className='login-register'>
              <li>
                <Link to='/register'>Register</Link>
              </li>
              <Link to='/login'>Login</Link>
            </li>
          ) : (
            <Link to='/profile' className='link'>
              {auth.userCreds.profilePicture ? (
                <img
                  className='profile-picture'
                  src={PF + auth.userCreds.profilePicture}
                  alt=''
                />
              ) : (
                <i className='fa-solid fa-user'></i>
              )}
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Navlinks
