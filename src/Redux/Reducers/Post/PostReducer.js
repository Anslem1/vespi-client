import { postConstants } from '../../Actions/constants'
const initialState = {
  posts: []
}

export default (state  = initialState, action) => {
  switch (action.type) {
      case postConstants.GET_ALL_POSTS_SUCCESS:
          state = {
              ...state,
              posts: action.payload.posts
          };
          break;
  }
  return state
}