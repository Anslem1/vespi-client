import './App.css'
import RenderPost from './pages/Post/RenderPost'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Men from './pages/Men/Men'
import Women from './pages/Women/Women'
import Journals from './pages/Journal/Journals'
import JournalArticle from './pages/Article/JournalArticle'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Aboutus from './pages/AboutUs/Aboutus'
import { useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'

import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialData, isUserLoggedin } from './Redux/Actions'
function App () {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) dispatch(isUserLoggedin())
  }, [auth.authenticate])
  useEffect(() => {
    dispatch(getInitialData())
  }, [])
  const token = localStorage.getItem('token')

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/men' element={<Men />} />
        <Route path='/women' element={<Women />} />
        <Route path='/journals' element={<Journals />} />
        <Route path='/post' element={<RenderPost />} />
        <Route path='/register' element={token ? <Home /> : <Register />} />
        <Route path='/login' element={token ? <Home /> : <Login />} />
        <Route path='/profile' element={token ? <Profile /> : <Login />} />
        <Route
          path='/journalarticle/:journalarticleId'
          element={<JournalArticle />}
        />
        <Route path='/aboutus' element={<Aboutus />} />
      </Routes>
    </>
  )
}

export default App
