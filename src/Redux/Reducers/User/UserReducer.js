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
    case registerConstants.USER_REGISTER_FAILURE: {
      state = {
        ...state,
        registering: false,
        registered: false,
        error: action.payload.error
      }
      break
    }

    case deleteUserConstant.DELETE_USER_REQUEST: {
      state = {
        ...state,
        deletingAccount: true,
        deletedAccount: false
      }
    }
    case deleteUserConstant.DELETE_USER_sSUCCESS: {
      state = { ...initialState, deletingAccount: false, deletedAccount: true }
      break
    }
    case deleteUserConstant.DELETE_USER_FAILURE: {
      state = {
        ...state,
        deletedAccount: false,
        deletedAccount: false
      }
      break;
    }
  }

  return state
}
