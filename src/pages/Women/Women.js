import React, { useEffect } from 'react'
import Womendata from './Womendata'
import Footer from '../../components/Footer/Footer'
import '../Men/Men.css'
import { getCategory } from '../../Redux/Actions'
import { useDispatch, useSelector } from 'react-redux'

function Women () {
  const dispatch = useDispatch()
  const category = useSelector(state => state.category)

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  function renderHeader (categories) {
    let allCateogry = []
    for (let category of categories) {
      allCateogry.push(category.name)
    }
    return allCateogry[1]
  }

  function renderWomenCategoryName (categories) {
    let allCateogry = []
    for (let category of categories) {
      allCateogry.push(
        categories[1].children.map(men => {
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
    return allCateogry[1]
  }

  return (
    <>
      <h1 className='men-text'>{renderHeader(category.categories)}</h1>
      <div className='men-container'>
        {renderWomenCategoryName(category.categories)}
      </div>
      <Footer />
    </>
  )
}

export default Women
