import axios from '../helpers/axios'
import {
  authConstant,
  deleteUserConstant,
  updateUserConstant,
  registerConstants
} from './constants'

export function LoginUser (userCreds) {
  return async dispatch => {
    try {
      dispatch({ type: authConstant.LOGIN_REQUEST })
      const res = await axios.post('/auth/login', {
        ...userCreds
      })
  
      if (res.status === 200) {
        const { token, userCreds } = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('userCreds', JSON.stringify(userCreds))
        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: {
            token,
            userCreds
          }
        })
      }
    } catch (error) {
      console.log({ error })
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { error: error.response.data.message }
      })
    }
  }
}

export function register (userCreds) {
  return async dispatch => {
    try {
      dispatch({ type: registerConstants.USER_REGISTER_REQUEST })
      const res = await axios.post('/auth/register', {
        ...userCreds
      })
 
      if (res.status === 200) {
 
        const {
          data,
          data: { token }
        } = res
        localStorage.setItem('token', data.token)
        localStorage.setItem('userCreds', JSON.stringify(data.user))
    
        dispatch({
          type: registerConstants.USER_REGISTER_SUCCESS,
          payload: {
            token,
            data: data.userCreds
          }
        })
        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: {
            token,
            userCreds: data.user
          }
        })
      }
    } catch (error) {
      console.log({ error })
   
      dispatch({
        type: registerConstants.USER_REGISTER_FAILURE,
        payload: { error: error.response.data.message }
      })
    }
  }
}

export function logOutUser () {
  return async dispatch => {
    dispatch({ type: authConstant.LOGIN_REQUEST })
    const res = await axios.post('/auth/logout')
    if (res.status === 200) {
      window.localStorage.clear()
      dispatch({ type: authConstant.LOGOUT_SUCCESS })
    } else {
      dispatch({
        type: authConstant.LOGOUT_FAILURE,
        payload: { error: res.data.message }
      })
    }
  }
}

export function isUserLoggedin () {
  return async dispatch => {
    const token = localStorage.getItem('token')
    if (token) {
      const userCreds = JSON.parse(localStorage.getItem('userCreds'))
      dispatch({
        type: authConstant.LOGIN_SUCCESS,
        payload: {
          token,
          userCreds
        }
      })
    }
    // else {
    //   dispatch({
    //     type: authConstant.LOGIN_FAILURE,
    //     // payload: { error: 'User needs to login' }
    //   })
    // }
  }
}

export function updateUserAccount (id, form) {
  return async dispatch => {
    dispatch({ type: updateUserConstant.UPDATE_USER_REQUEST })
    try {
      const res = await axios.put(`/users/${id}`, form)

      if (res.status === 200) {
        const {
          message,
          userCreds: { ...credentials }
        } = res.data
      

        localStorage.setItem('userCreds', JSON.stringify(credentials))
        dispatch({
          type: updateUserConstant.UPDATE_USER_SUCCESS,
          payload: { userCreds: credentials, message }
        })
      }
    } catch (error) {
      dispatch({
        type: updateUserConstant.UPDATE_USER_FAILURE,
        payload: { error: error.response.data.message }
      })
    }
  }
}
export function deleteUserAccount (id) {
  return async dispatch => {
    dispatch({ type: deleteUserConstant.DELETE_USER_REQUEST })
    const res = await axios.delete(`/users/${id}`, { ...id })
    if (res.status === 200) {
      window.localStorage.clear()
      window.location.replace('/login')
      dispatch({
        type: deleteUserConstant.DELETE_USER_SUCCESS,
        payload: res.data
      })
    } else {
      dispatch({
        type: deleteUserConstant.DELETE_USER_FAILURE
      })
    }
  }
}
