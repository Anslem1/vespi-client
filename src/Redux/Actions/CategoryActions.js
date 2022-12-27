import axios from '../helpers/axios'
import { categoryConstant } from './constants'

export function getCategory () {
  return async dispatch => {
    const res = await axios.get('/categories')
    
    dispatch({
      type: categoryConstant.GET_ALL_CATEGORIES_REQUEST
    })
    if (res.status === 200) {
      const { categoryList } = res.data
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList }
      })
    } else {
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error }
      })
    }
  }
}
