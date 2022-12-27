// import { authConstant } from '../actions/constants'
import { authConstant, updateUserConstant } from '../../Actions/constants'

const initialState = {
  token: null,
  userCreds: {
    username: '',
    email: '',
    profilePicture: ''
  },
  loading: false,
  authenticate: false,
  authenticating: false,
  loggingOut: false,
  error: null,
  message: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true
      }
      break
    case authConstant.LOGIN_SUCCESS:
      state = {
        ...state,
        userCreds: action.payload.userCreds,
        token: action.payload.token,
        authenticate: true,
        authenticating: false
      }
      break
    case authConstant.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        authenticate: false,
        authenticating: false
      }
      break
    case updateUserConstant.UPDATE_USER_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case updateUserConstant.UPDATE_USER_SUCCESS:
      state = {
        ...state,
        userCreds: action.payload.userCreds,
        message: action.payload.message,
        loading: false
      }
      break
    case updateUserConstant.UPDATE_USER_FAILURE:
    
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      }
      break
    case authConstant.LOGOUT_REQUEST: {
      state = {
        ...state,
        loggingOut: true
      }
      break
    }
    case authConstant.LOGOUT_SUCCESS: {
      state = {
        ...initialState,
        loggingOut: false
      }
      break
    }
    case authConstant.LOGOUT_FAILURE: {
      state = {
        ...state,
        error: action.payload.error,
        loggingOut: false
      }
      break
    }
  }

  return state
}
