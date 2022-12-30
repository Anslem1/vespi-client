import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import TextareaAutosize from 'react-textarea-autosize'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUserAccount,
  logOutUser,
  updateUser,
  updateUserAccount
} from '../../Redux/Actions'
import { isUserLoggedin } from '../../Redux/Actions'
import './Profile.css'

function Profile () {
  const dispatch = useDispatch()
  const [profilePicture, setProfilePicture] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const profileParams = useLocation()

  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedin())
    }
  }, [])

  function Logout () {
    window.localStorage.clear()
    dispatch(logOutUser())
  }

  function submitProfile () {
    const form = new FormData()
    form.append('_id', auth.userCreds._id)
    form.append('username', username)
    form.append('email', email)
    form.append('profilePicture', profilePicture)
    form.append('password', password)

    dispatch(updateUserAccount(auth.userCreds._id, form))
  }

  function deleteAccount() {
    const form = new FormData()
    form.append('id', auth.userCreds._id)
 

    dispatch(deleteUserAccount(auth.userCreds._id, navigate))
  }

  return (
    <>
      <div className='logout-container'>
        <label htmlFor='logout'>
          <i className='fa-solid fa-right-from-bracket logout'></i>
        </label>

        <button className='logout' id='logout' onClick={Logout}>
          Logout
        </button>
      </div>
      <main className='my-profile'>
        <h1 className='setting__header'>My Profile</h1>
        <div className='settings-container'>
          <div className='profile-img-container'>
            {auth.userCreds.profilePicture ? (
              <img
                src={auth.userCreds.profilePicture}
                alt=''
                className='profile-img'
              />
            ) : (
              <i className='fa-solid fa-user profile-pic'></i>
            )}

            <div className='change-profile-container'>
              <label htmlFor='fileInput'>
                <i className='fa-solid fa-plus change'></i>
                <input
                  type='file'
                  name='file'
                  id='fileInput'
                  className='file'
                  onChange={e => setProfilePicture(e.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div className='profile__info'>
            <h3>{auth.userCreds.username}</h3>
            <p>{auth.userCreds.email}</p>
          </div>
        </div>
        <div className='info-container'>
          <div className='input-container'>
            <h4 className='profile_text'>Username</h4>
            <input
              type='text'
              className='username_input username'
              placeholder={auth.userCreds.username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='input-container'>
            <h4 className='profile_text'>Email</h4>
            <input
              type='email'
              className='username_input email'
              placeholder={auth.userCreds.email}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='input-container password'>
            <h4 className='profile_text'>Password</h4>
            <input
              type='password'
              className='username_input'
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className='btn-container'>
            {(username || email || password || profilePicture) && (
              <button className='update_profile_btn' onClick={submitProfile}>
                Update account
              </button>
            )}
          </div>
          <button className='delete_profile_btn' onClick={deleteAccount}>
            delete account
          </button>
        </div>
        {auth.message && <h3 className='error'>{auth.message}</h3>}

        {auth.error === 'We could not find that user' ||
        auth.error === 'Wrong username or password' ||
        auth.error === 'Username already exists'
          ? null
          : auth.error && <h3 className='error'>{auth.error}</h3>}
      </main>

      <Footer />
    </>
  )
}

export default Profile
