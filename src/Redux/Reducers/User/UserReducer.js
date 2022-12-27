import {
  deleteUserConstant,
  registerConstants,
  updateUserConstant
} from '../../Actions/constants'

const initialState = {
  error: null,
  email: '',
  username: '',
  password: '',
  registering: false,
  deletingAccount: false
}

export default function (state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case registerConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        registering: true
      }
      break
    case registerConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        registering: false,
        data: action.payload.data
      }
      break
    case registerConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        registering: false
      }
      break
  }

  return state
}
