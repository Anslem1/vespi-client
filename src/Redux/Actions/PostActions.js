import { useDispatch } from 'react-redux'
import axios from '../helpers/axios'
import { postConstants } from './constants'
import { getInitialData } from './initialDataAction'

export function getPost () {
  return async dispatch => {
    try {
      dispatch({ type: postConstants.GET_ALL_POSTS_REQUEST })
      const res = await axios.get('/journals/get')
      if (res.status === 200) {
        dispatch({ type: postConstants.GET_ALL_POSTS_SUCCESS })
      }
    } catch (error) {}
  }
}
export function createPost (form, navigate) {
  return async dispatch => {
    const res = await axios.post('/journals/create', form)
    if (res.status === 201) {
      dispatch(getInitialData())
      navigate('/journals')
    }
  }
}
