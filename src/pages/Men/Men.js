import './Men.css'
import { useEffect, useState } from 'react'
import axios from '../../Redux/helpers/axios'
import MenPost from './Men-page/MenPost'
import { useLocation } from 'react-router-dom'
function Men () {
  const [men, setMen] = useState([])
  const { search } = useLocation()

  useEffect(() => {
    async function fetchMenData () {
      const res = await axios.get('/categories' + search)


     
    }

    fetchMenData()
  }, [])

  return <MenPost/>
}

export default Men
