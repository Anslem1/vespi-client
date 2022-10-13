// import { authConstant } from '../actions/constants'
import { authConstant } from '../../Actions/constants'

const initialState = {
  token: null,
  userCreds: {
    username: '',
    email: '',
    profilePicture: ''
  },
  authenticate: false,
  authenticating: false,
  loggingOut: false,
  loggedOut: false,
  error: null,
  message: ''
}

export default function (state = initialState, action) {
  console.log(action)
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
        loggingOut: false,
        loggedOut: true
      }
      break
    }
    case authConstant.LOGOUT_FAILURE: {
      state = {
        ...state,
        error: action.payload.error,
        loggingOut: false,
        loggedOut: false
      }
      break
    }
  }
  

  return state
}
