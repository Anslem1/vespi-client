import { deleteUserConstant, registerConstants } from '../../Actions/constants'

const initialState = {
  error: null,

  email: '',
  username: '',
  password: '',

  registering: false,
  registered: false,
  deletingAccount: false,
  deletedAccount: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case registerConstants.USER_REGISTER_REQUEST: {
      state = {
        ...state,
        registering: true,
        registered: false
      }
      break
    }
    case registerConstants.USER_REGISTER_SUCCESS: {
      state = {
        ...state,
        data: action.payload.data,
        registered: true,
        registering: false
      }
      break
    }
  }

  return state
}
