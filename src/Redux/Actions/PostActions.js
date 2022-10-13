import { useDispatch } from 'react-redux'
import axios from '../helpers/axios'

export function createPost (post) {
  return async dispatch => {
    await axios.post('/journals', { ...post })
  }
}
export function getPost () {
  return async dispatch => {
     await axios.post('/journals')
  }
}
