// export default function (state = { name: "anslem" }, action) {
//     return state
// }

import { combineReducers } from 'redux'
import authReducer from './Auth/AuthReducer'
import userReducer from './User/UserReducer'
import postReducer from './Post/PostReducer'
import categoryReducer from './Category/CategoryReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  post: postReducer
})

export default rootReducer
