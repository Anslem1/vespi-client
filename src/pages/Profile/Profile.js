import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import TextareaAutosize from 'react-textarea-autosize'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAccount, logOutUser, updateUser } from '../../Redux/Actions'
import { isUserLoggedin } from '../../Redux/Actions'
import './Profile.css'
import axios from '../../Redux/helpers/axios'
import { nanoid } from 'nanoid'

function Profile () {
  const dispatch = useDispatch()
  const [profilePicture, setProfilePicture] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [_id, set_Id] = useState('')
  const [id, setId] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setErrror] = useState(false)

  const auth = useSelector(state => state.auth)
  const PF = 'http://localhost:5000/images/'

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedin())
    }
  }, [])

  function Logout () {
    window.localStorage.clear()
    dispatch(logOutUser())
    window.location.reload()
  }

  if (auth.authenticate === false) {
    return <Navigate replace={true} to='/login' />
  }

  async function submitProfile (e) {
    e.preventDefault()
    const updatedUserCreds = {
      _id: auth.userCreds._id,
      username,
      email,
      profilePicture: auth.userCreds.profilePicture,
      password
    }
    if (profilePicture) {
      try {
        const data = new FormData()
        const filename = nanoid() + profilePicture.name
        data.append('file', filename)
        data.append('file', profilePicture)
        updatedUserCreds.profilePicture = filename
        await axios.post('/upload', data)
        await axios.put(`/users/${auth.userCreds._id}`, {
          ...updatedUserCreds
        })
        localStorage.setItem('userCreds', JSON.stringify(updatedUserCreds))
      } catch (err) {}
    }
    try {
      await axios.put(`/users/${auth.userCreds._id}`, {
        ...updatedUserCreds
      })
      localStorage.setItem('userCreds', JSON.stringify(updatedUserCreds))
      setSuccess(true)
    } catch (error) {
      setErrror(true)
      setSuccess(false)
    }
  }



  // console.log(auth)

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
      <form className='my-profile' action='' onSubmit={submitProfile}>
        <h1 className='setting__header'>My Profile</h1>
        <div className='settings-container'>
          <div className='profile-img-container'>
            {auth.userCreds.profilePicture ? (
              <img
                src={PF + auth.userCreds.profilePicture}
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
              required
            />
          </div>
          <div className='input-container'>
            <h4 className='profile_text'>Email</h4>
            <input
              type='email'
              className='username_input email'
              required
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
              required
            />
          </div>
          <div className='btn-container'>
            <button className='update_profile_btn' type='submit'>
              Update account
            </button>
          </div>
        </div>
        {success && <h3 className='error'>Account updated Succesfully</h3>}
        {error && <h3 className='error'>Something went wrong</h3>}
      </form>

   
    

      <Footer />
    </>
  )
}

export default Profile
