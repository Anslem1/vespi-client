import { categoryConstant } from '../../Actions/constants'

const initialState = {
  categories: [],
  loading: false,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case categoryConstant.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories
      }
      break
    }
    return state
}
