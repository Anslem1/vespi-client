import '../Men.css'
import Footer from '../../../components/Footer/Footer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../../Redux/Actions'
import axios from '../../../Redux/helpers/axios'
import { Link } from 'react-router-dom'

function MenPost ({ men }) {
  const category = useSelector(state => state.category)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  function renderHeader (categories) {
    let allCateogry = []
    for (let category of categories) {
      allCateogry.push(category.name)
    }

    return allCateogry[0]
  }

  function renderMenCategoryName (categories) {
    let allCateogry = []
    for (let category of categories) {
      allCateogry.push(
        categories[0].children.map(men => {
          return (
            <>
              <div className='mens-wear-container'>
                <h3 className='men-heading'>{men.name}</h3>
                <div className='img-container'>
                  <img src={men.categoryImage} alt='' className='mens-img' />
                  <div className='for-men'>
                    <p className='mens-wear-desc'>{men.categoryDesc}</p>
                  </div>
                </div>
              </div>
            </>
          )
        })
      )
    }
    return allCateogry[0]
  }

  return (
    <>
      <h1 className='men-text'>{renderHeader(category.categories)}</h1>
      <div className='men-container'>
        {renderMenCategoryName(category.categories)}
      </div>
      <Footer />
    </>
  )
}

export default MenPost
