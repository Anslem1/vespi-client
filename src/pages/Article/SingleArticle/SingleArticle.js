import React, { useEffect, useState } from 'react'
import bodyData from '../../../components/Body/bodyData'
import './Singlepost.css'
import Emailus from '../../../components/Body/bottomBody/email-us/email-us'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from '../../../Redux/helpers/axios'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialData, getPost } from '../../../Redux/Actions'

function Singlejournal () {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const [journal, setJournal] = useState({})
  const [article, setArticle] = useState([])
  const [nextStory, setNextStory] = useState([])
  const [prevStory, setPrevStory] = useState([])
  const [caption, setCaption] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [desc, setDesc] = useState('')
  const [id, setId] = useState('')
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    async function getJournal () {
      const res = await axios.get('/journals/get/' + path)

      setJournal(res.data)
      setCaption(res.data.caption)
      setDesc(res.data.desc)
      setCategoryName(res.data.category.name)
      setId(res.data._id)
    }

    getJournal()
  }, [path])

  const { search } = useLocation()

  useEffect(() => {
    async function fetchJournal () {
      const res = await axios.get('/journals/get/' + search)
      const random = Math.floor(Math.random() * res.data.length)
      setArticle(res.data[random])
    }

    fetchJournal()
  }, [search])

  useEffect(() => {
    async function nextStoryFunc () {
      const res = await axios.get('/journals/get/' + search)
      const random = Math.floor(Math.random() * res.data.length)
      setNextStory(res.data[random])
    }

    nextStoryFunc()
  }, [search])
  useEffect(() => {
    async function prevStoryFunc () {
      const res = await axios.get('/journals/get/' + search)
      const random = Math.floor(Math.random() * res.data.length)
      setPrevStory(res.data[random])
    }

    prevStoryFunc()
  }, [search])

  async function handleDelete () {
    try {
      const res = await axios.delete('/journals/delete/' + path, {
        data: {
          username: auth.userCreds.username
        }
      })
      if (res.status(200)) {
        navigate('/journals')
        dispatch(getInitialData())
      }
    } catch (error) {}
  }

  async function handleUpdate () {
    try {
      const res = await axios.put('/journals/update/' + path, {
        username: auth.userCreds.username,
        caption,
        desc
      })
  
      if (res.status === 200) {
        navigate('/journals')
        window.location.reload()
        dispatch(getInitialData())
      }
    } catch (error) {}
  }

  return (
    <>
      <div className='post-wrapper'>
        <div className='post-details'>
          <Link to='/journals' className='link back-to-journal'>
            <i className='fa-solid fa-arrow-left-long'></i>Back to Journals
          </Link>

          <p>
            Posted under <span className='trends'>{categoryName}</span>
          </p>
          <div className='time'>
            <p className='posted-on'>
              Posted on {new Date(journal.createdAt).toDateString()}
            </p>
          </div>
        </div>
        <div className='post-container'>
          <div className='post-content'>
            <div className='h1-container'>
              <div className='post-socials'>
                <p>
                  Dig this article? <br /> SHARE THE LOVE
                </p>
                <i className='fa-brands fa-facebook-f'></i>
                <i className='fa-brands fa-pinterest'></i>
                <i className='fa-brands fa-twitter'></i>
                <i className='fa-solid fa-envelope'></i>
              </div>
              <div className='h1-text'>
                {update ? (
                  <input
                    type='text'
                    value={caption}
                    className='text__input'
                    onChange={e => setCaption(e.target.value)}
                  />
                ) : (
                  <h1>{journal.caption}</h1>
                )}

                <Link
                  to={`/journals?user=${journal.username}`}
                  className='link'
                >
                  <p className='written__by'>Written by {journal.username}</p>
                </Link>
                {journal.postImage && (
                  <img src={journal.postImage} alt='' className='article_img' />
                )}
                {journal.username === auth.userCreds?.username && (
                  <div className='edit-delete'>
                    <i
                      className='edit fa-solid fa-feather'
                      onClick={() => setUpdate(true)}
                    ></i>
                    <i
                      className='delete fa-solid fa-trash-can'
                      onClick={handleDelete}
                    ></i>
                  </div>
                )}
                {update ? (
                  <input
                    type='text'
                    value={desc}
                    className='text__input'
                    onChange={e => setDesc(e.target.value)}
                  />
                ) : (
                  <p className='post-text'>{journal.desc}</p>
                )}
              </div>

              <div className='related-article'>
                <h3 className='h3'>related articles</h3>
                {id === article._id ? (
                  ''
                ) : (
                  <>
                    <Link
                      to={`/journalarticle/${article._id}`}
                      className='link'
                    >
                      {article.postImage && (
                        <img
                          src={article.postImage}
                          alt=''
                          className='article__img'
                        />
                      )}

                      <h5>{article.caption}</h5>
                      <p>{article.desc}</p>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {journal.photo && (
              <img src={journal.photo} alt='' className='post-image' />
            )}
            {update && (
              <button className='updatw_post' onClick={handleUpdate}>
                Update post
              </button>
            )}
          </div>
        </div>

        <div className='other-stories'>
          {id === prevStory._id ? (
            ''
          ) : (
            <Link to={`/journalarticle/${prevStory._id}`} className='link'>
              <div className='story-1'>
                {prevStory.postImage && (
                  <img src={prevStory.postImage} alt='' />
                )}

                <div className='prev-story-container'>
                  <h6 className='prev-stories'>Previous Story</h6>
                  <p>{prevStory.caption}</p>
                </div>
              </div>
            </Link>
          )}
          <p className='comments'>12 comments +</p>
          {id === nextStory._id ? (
            ''
          ) : (
            <Link to={`/journalarticle/${nextStory._id}`} className='link'>
              <div className='story-2'>
                {nextStory.postImage && (
                  <img src={nextStory.postImage} alt='' />
                )}
                <div className='next-story-container'>
                  <h6 className='next-story'>Next Story</h6>
                  <p>{article.caption}</p>
                </div>
              </div>
            </Link>
          )}
        </div>

        <h1 className='related-stories-text'>Related Stories</h1>
        <div className='related-stories'>
          <div className='related-stories-1'>
            <Link to='/' className='link'>
              <img src={bodyData[0].image} alt='' />
              <h2>{bodyData[0].heading}</h2>
              <p>{bodyData[0].text}</p>
            </Link>
          </div>

          <div className='related-stories-2'>
            <Link to='/' className='link'>
              <img src={bodyData[2].image} alt='' />
              <h2>{bodyData[2].heading}</h2>
              <p>{bodyData[2].text}</p>
            </Link>
          </div>

          <div className='related-stories-3'>
            <Link to='/' className='link'>
              <img src={bodyData[3].image} alt='' />
              <h2>{bodyData[3].heading}</h2>
              <p>{bodyData[3].text}</p>
            </Link>
          </div>

          <div className='related-stories-4'>
            <Link to='/' className='link'>
              <img src={bodyData[5].image} alt='' />
              <h2>{bodyData[5].heading}</h2>
              <p>{bodyData[5].text}</p>
            </Link>
          </div>
        </div>

        <Emailus />
      </div>
    </>
  )
}

export default Singlejournal
