import {
  categoryConstant,
  initialDataConstant,
  postConstants
} from './constants'
import axios from '../helpers/axios'

export function getInitialData () {
  return async dispatch => {
    // dispatch({
    //   type: initialDataConstant.GET_ALL_INITIAL_DATA_REQUEST
    // })
    const res = await axios.post('/initialdata')
    console.log(res)
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
