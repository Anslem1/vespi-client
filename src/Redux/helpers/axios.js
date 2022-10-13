import axios from 'axios'
import { API } from './urlConfig'

const axioInstance = axios.create({
  baseURL: API
})

export default axioInstance
