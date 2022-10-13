import React, { useEffect, useState } from 'react'
import './Post.css'
import Footer from '../../../components/Footer/Footer'
import TextareaAutosize from 'react-textarea-autosize'
import { useSelector } from 'react-redux'
import { getCategory } from '../../../Redux/Actions'
import { nanoid } from 'nanoid'

import { useDispatch } from 'react-redux'
import { createPost } from '../../../Redux/Actions/PostActions'
import axios from '../../../Redux/helpers/axios'

function Post () {
  const dispatch = useDispatch()
  const category = useSelector(state => state.category)
  const auth = useSelector(state => state.auth)

  const [username, setUsername] = useState('')
  const [error, setError] = useState(false)
  const [caption, setCaption] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [desc, setDesc] = useState('')
  const [postCategoryId, setPostCategoryId] = useState('')

  function createMenCategoryLabel (categories, options = []) {
    for (let category of categories) {
      options.push(category.name)
    }
    return options[0]
  }

  function createWomenCategoryLabel (categories, options = []) {
    for (let category of categories) {
      options.push(category.name)
    }
    return options[1]
  }


  useEffect(() => {
    dispatch(getCategory())
  }, [])

  function createMenCategoryOptions (categories, options = []) {
    for (let category of categories) {
      options.push(
        categories[0].children.map(men => {
          return (
            <>
              <option value={men._id}>{men.name}</option>
              <h3 className='men-heading'>{men.name}</h3>
            </>
          )
        })
      )
    }

    return options[0]
  }

  function createWomenCategoryOptions (categories, options = []) {
    for (let category of categories) {
      options.push(
        categories[1].children.map(women => {
          return (
            <>
              <option value={women._id}>{women.name}</option>
              <h3 className='men-heading'>{women.name}</h3>
            </>
          )
        })
      )
    }

    return options[1]
  }

  function handlePostImage (e) {
    setPostImage(e.target.files[0])
    console.log(e.target.files[0])
  }

  async function submitPost (e) {
    e.preventDefault()
    try {
      const post = {
        username: auth.userCreds.username,
        caption,
        desc,
        postImage,
        category: postCategoryId
      }
      if (postImage) {
        const data = new FormData()
        const filename = nanoid() + postImage.name
        data.append('file', filename)
        data.append('file', postImage)
        post.postImage = filename
        try {
          await axios.post('/upload', data)
        } catch (err) {
          setError(true)
        }
      }
      dispatch(createPost(post))
      setError(false)
      error === false && window.location.replace('/journals')
    } catch (err) {
      setError(true)
      console.log(error === true)
    }

  }

  return (
    <>
      <h1 className='post__text'>Add to journal</h1>
      <form action='' className='form-container' onSubmit={submitPost}>
        <div className='card__container'>
          {postImage && (
            <img
              // src='https://assets.vogue.com/photos/62a64eec88b88c58f7d6b94a/master/w_3000,h_4498,c_limit/london-mens-fashion-week-ss23-street-style-acielle-styledumonde-day2-003.jpg'
              src={window.URL.createObjectURL(postImage)}
              alt=''
              className='post__image'
            />
          )}
          <div className='input__container'>
            <label htmlFor='fileInput'>
              <i className='fa-solid fa-image post__icon'></i>
            </label>
            <input
              type='file'
              // name={postImage}
              name='file'
              id='fileInput'
              className='file__imput'
              onChange={handlePostImage}
            />
            <TextareaAutosize
              className='text__input'
              name=''
              value={caption}
              onChange={e => setCaption(e.target.value)}
              id=''
              placeholder='Caption'
              autoFocus={true}
              required
            />
            <div className='textarea__container'>
              <TextareaAutosize
                placeholder='Description..'
                className='text__area'
                value={desc}
                onChange={e => setDesc(e.target.value)}
                required
              />
              <div className='button__container'>
                <button className='button'>Post</button>
              </div>
            </div>
          </div>
          <div className='select-container'>
            <div className='mb-3'>
              <label htmlFor='' className='form-label'>
                {createMenCategoryLabel(category.categories)}
              </label>

              {/* onChange={e => setParentCategoryId(e.target.value)} */}
              <select
                className='form-select'
                name=''
                id=''
                value={postCategoryId}
                onChange={e => setPostCategoryId(e.target.value)}
              >
                <option>--Select a category --</option>
                {createMenCategoryOptions(category.categories)}
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='' className='form-label'>
                {createWomenCategoryLabel(category.categories)}
              </label>
              <select
                className='form-select'
                name=''
                id=''
                value={postCategoryId}
                onChange={e => setPostCategoryId(e.target.value)}
              >
                <option>--Select a category --</option>
                {createWomenCategoryOptions(category.categories)}
              </select>
            </div>
          </div>
        </div>
        {error && <h3 className='error'>Please fill all field</h3>}
      </form>
      <Footer />
    </>
  )
}

export default Post
