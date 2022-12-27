import React, { useEffect, useRef, useState } from 'react'
import './Post.css'
import Footer from '../../../components/Footer/Footer'
import TextareaAutosize from 'react-textarea-autosize'
import { useSelector } from 'react-redux'
import { getCategory } from '../../../Redux/Actions'

import { useDispatch } from 'react-redux'
import { createPost } from '../../../Redux/Actions/PostActions'
import { useNavigate } from 'react-router-dom'

function Post () {
  const dispatch = useDispatch()
  const category = useSelector(state => state.category)
  const auth = useSelector(state => state.auth)

  const [caption, setCaption] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [desc, setDesc] = useState('')
  const [postCategoryId, setPostCategoryId] = useState('')
  const buttonRef = useRef()
  const navigate = useNavigate()

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

  const disableButton = () => {
    if (!desc || !caption || !postImage || !postCategoryId) {
      buttonRef.current.disabled = true
    } else {
      buttonRef.current.disabled = false
    }
  }

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
  }

  function submitPost () {
    const form = new FormData()
    form.append('username', auth.userCreds.username)
    form.append('postImage', postImage)
    form.append('caption', caption)
    form.append('desc', desc)
    form.append('category', postCategoryId)

    dispatch(createPost(form, navigate))
 
  }

  return (
    <>
      <h1 className='post__text'>Add to journal</h1>
      <main action='' className='form-container'>
        <div className='card__container'>
          {postImage && (
            <img
              src={window.URL.createObjectURL(postImage)}
              alt='postimage'
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
              id='fileInput'
              name='postImage'
              className='file__imput'
              onChange={handlePostImage}
              required
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
                required='true'
              />
              <div className='button__container'>
                <button
                  className={`button disabled`}
                  onClick={submitPost}
                  disabled={!desc || !caption || !postImage || !postCategoryId}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div className='select-container'>
            <div className='mb-3'>
              <label htmlFor='' className='form-label'>
                {createMenCategoryLabel(category.categories)}
              </label>

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
                value={postCategoryId}
                onChange={e => setPostCategoryId(e.target.value)}
              >
                <option>--Select a category --</option>
                {createWomenCategoryOptions(category.categories)}
              </select>
            </div>
          </div>
        </div>
        {(!desc || !caption || !postImage || !postCategoryId) && (
          <h3 className='error' style={{ marginTop: '40px' }}>
            Please fill all field
          </h3>
        )}
      </main>
      <Footer />
    </>
  )
}

export default Post
