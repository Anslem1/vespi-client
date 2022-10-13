import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function MobileNavLink ({ viewMenu }) {
  const auth = useSelector(state => state.auth)
  const PF = 'http://localhost:5000/images/'

  const userCreds = localStorage.getItem('userCreds')

  return (
    <nav className='mobile-navbar-container'>
      <ul>
        <li>
          <Link to='/' className='mobile-vespi'>
            Vespi
          </Link>
        </li>
      </ul>
      {viewMenu && (
        <ul className='mobile-products'>
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
      )}
      <ul className='mobile-login-search'>
        <li>
          {userCreds === null ? (
            <div className='mobile-login-register'>
              <li>
                <Link to='/register'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </div>
          ) : (
            <Link to='/profile' className='link'>
              {auth.userCreds.profilePicture ? (
                <img
                  className='profile-picture'
                  src={PF + auth.userCreds.profilePicture}
                  // src='https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
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

export default MobileNavLink
