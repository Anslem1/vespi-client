import React, { useEffect, useState } from 'react'
import bodyData from '../../../components/Body/bodyData'
import './Singlepost.css'
import Emailus from '../../../components/Body/bottomBody/email-us/email-us'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from '../../../Redux/helpers/axios'
import { useSelector } from 'react-redux'

function Singlejournal () {
  const date = new Date().toDateString()
  const auth = useSelector(state => state.auth)

  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const [journal, setJournal] = useState({})
  const [article, setArticle] = useState([])
  const [nextStory, setNextStory] = useState([])
  const [prevStory, setPrevStory] = useState([])
  const [caption, setCaption] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [desc, setDesc] = useState('')
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    async function getJournal () {
      const res = await axios.get('/journals/' + path)
      setJournal(res.data)
      setCaption(res.data.caption)
      setDesc(res.data.desc)
      setCategoryName(res.data.category.name)
      console.log(res.data.category.name)
    }

    getJournal()
  }, [path])

  const { search } = useLocation()
  useEffect(() => {
    async function fetchJournal () {
      const res = await axios.get('/journals' + search)
      const random = Math.floor(Math.random() * res.data.length)
      setArticle(res.data[random])
    }

    fetchJournal()
  }, [search])

  useEffect(() => {
    async function nextStoryFunc () {
      const res = await axios.get('/journals' + search)
      const random = Math.floor(Math.random() * res.data.length)
      setNextStory(res.data[random])
    }

    nextStoryFunc()
  }, [search])
  useEffect(() => {
    async function prevStoryFunc () {
      const res = await axios.get('/journals' + search)
      const random = Math.floor(Math.random() * res.data.length)
      setPrevStory(res.data[random])
    }

    prevStoryFunc()
  }, [search])

  const PF = 'http://localhost:5000/images/'

  async function handleDelete () {
    try {
      await axios.delete('/journals/' + path, {
        data: {
          username: auth.userCreds.username
        }
      })
      window.location.replace('/journals')
    } catch (error) {}
  }

  async function handleUpdate () {
    try {
      await axios.put('/journals/' + path, {
        username: auth.userCreds.username,
        caption,
        desc
      })
      window.location.reload()
    } catch (error) {}
  }

  return (
    <>
      <div className='post-wrapper'>
        <div className='post-details'>
          <Link to='/journals' className='link'>
            <i className='fa-solid fa-arrow-left-long'></i>Back to Journals
          </Link>

          <p>
            Posted under <span className='trends'>{categoryName}</span>
          </p>
          <div className='time'>
            <p className='date'>{date}</p>
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
                {journal.postImage && (
                  <img
                    src={PF + journal.postImage}
                    // src='https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlzaW9ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
                    alt=''
                    className='article_img'
                  />
                )}
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
              </div>

              <div className='related-article'>
                <Link to={`/journalarticle/${article._id}`} className='link'>
                  {article.postImage && (
                    <img
                      src={PF + article.postImage}
                      alt=''
                      // className='article_img'
                    />
                  )}

                  <h5>{article.caption}</h5>
                  <p>{article.desc}</p>
                </Link>
              </div>
            </div>

            {journal.photo && (
              <img src={PF + journal.photo} alt='' className='post-image' />
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
            {update && (
              <button className='updatw_post' onClick={handleUpdate}>
                Update post
              </button>
            )}
          </div>
          <h4 className='post-quote'>
            “Apart from materials, fit is everything when it comes to well made
            clothing”
          </h4>
        </div>
        <div className='sub-content'>
          <h2>Shapes change with the times</h2>
          <p>
            Fuas molestias excepturi sint occaecati cupiditate non provident,
            similique sunt in culpa qui officia deserunt mollitia animi, id est
            laborum et dolorum fuga. Et harum quidem rerum facilis est et
            expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus id quod maxime placeat
            facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Temporibus autem quibusdam et aut officiis debitis aut
            rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint
            et molestiae non recusandae. Itaque earum rerum hic tenetur a
            sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat. Nam
            libero tempore, cum soluta nobis est eligendi optio cumque nihil
            impedit quo minus id quod maxime placeat facere possimus, omnis
            voluptas assumenda est, omnis dolor repellendus. Temporibus autem
            quibusdam et aut officiis debitis aut rerum necessitatibus.
          </p>
          <div className='hr'></div>
        </div>
        <div className='other-stories'>
          <Link to={`/journalarticle/${prevStory._id}`} className='link'>
            <div className='story-1'>
              {prevStory.postImage && (
                <img src={PF + prevStory.postImage} alt='' />
              )}

              <div className='prev-story-container'>
                <h6 className='prev-stories'>Previous Story</h6>
                <p>{prevStory.caption}</p>
              </div>
            </div>
          </Link>
          <p className='comments'>12 comments +</p>
          <Link to={`/journalarticle/${nextStory._id}`} className='link'>
            <div className='story-2'>
              {nextStory.postImage && (
                <img src={PF + nextStory.postImage} alt='' />
              )}
              <div
                className='next-story-container
'
              >
                <h6 className='next-story'>Next Story</h6>
                <p>{article.caption}</p>
              </div>
            </div>
          </Link>
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

          <div className='related-stories -4'>
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