import {
  categoryConstant,
  initialDataConstant,
  postConstants
} from './constants'
import axios from '../helpers/axios'

export function getInitialData () {
  return async dispatch => {
    const res = await axios.post('/initialdata')

    if (res.status === 200) {
      const { categories, posts } = res.data

      dispatch({
        type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories }
      })
      dispatch({
        type: postConstants.GET_ALL_POSTS_SUCCESS,
        payload: { posts }
      })
    }
  }
}
