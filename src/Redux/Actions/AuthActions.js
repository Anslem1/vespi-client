import axios from '../helpers/axios'
import {
  authConstant,
  deleteUserConstant,
  registerConstants
} from './constants'

export function LoginUser (userCreds) {
  console.log(userCreds)

  return async dispatch => {
    dispatch({ type: authConstant.LOGIN_REQUEST })
    const res = await axios.post('/auth/login', {
      ...userCreds
    })

    console.log(res.data)

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
    } else if (res.status === 400 || 500) {
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { error: res.data.error }
      })
    }
  }
}

export function register (userCreds) {
  console.log(userCreds)

  return async dispatch => {
    dispatch({ type: registerConstants.USER_REGISTER_REQUEST })
    const res = await axios.post('/auth/register', {
      ...userCreds
    })

    if (res.status === 200) {
      const { data } = res
      dispatch({
        type: registerConstants.USER_REGISTER_SUCCESS,
        payload: {
          data
        }
      })
    } else if (res.status === 400 || 500) {
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { error: res.data.error }
      })
    }
    console.log(res.data.error)
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
        payload: { error: res.data.error }
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
    } else {
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { error: 'User needs to login' }
      })
    }
  }
}

export function deleteUserAccount (id) {
  return async dispatch => {
    dispatch({ type: deleteUserConstant.DELETE_USER_REQUEST })
    const res = await axios.delete(`/users/${id}`, { ...id })
    console.log(res)
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