import React, { useEffect, useState } from 'react'
import footerProducts from './footer.product'
import footerLocations from './footer.location'
import productFooterImg from './product-footer-img'
import { Link } from 'react-router-dom'
import './Footer.css'
import axios from 'axios'

function Footer () {
  // const [category, setCategory] = useState([])

  // useEffect(() => {
  //   async function getCategory () {
  //     const res = await axios.get('/categories')
  //     setCategory(res.data)
  //   }
  //   getCategory()
  // }, [])

  const footerProdElement = footerProducts.map(footerProduct => {
    return (
      <>
        <ul className='product-ul'>
          <h6 key={footerProduct.productCategory}>
            {footerProduct.productCategory}
          </h6>
          {footerProduct.products.map(product => {
            return (
              <Link
                key={product.list}
                to={product.link}
                className='product-list-container'
              >
                <li className='product-list'>{product.list}</li>
              </Link>
            )
          })}
        </ul>
      </>
    )
  })

  const footerLocationElement = footerLocations.map(footerLocation => {
    return (
      <>
        <ul className='store-location'>
          <h6 key={footerLocation.store}>{footerLocation.store}</h6>
          {footerLocation.location}
        </ul>
      </>
    )
  })

  const productFooterImgElement = productFooterImg.map(productfooterimg => {
    return (
      <>
        <img
          src={productfooterimg.image}
          key={productfooterimg.image}
          alt=''
          className='product-footer-img'
        />
      </>
    )
  })

  return (
    <>
      <footer>
        <div className='footer'>
          <div className='footer-img-container'>
            <div className='footer-img-content'>
              {productFooterImgElement}
              <h2>Vespi</h2>
            </div>
          </div>
          <div className='footer-product'>{footerProdElement}</div>
          <div className='footer-location-container'>
            {footerLocationElement}
          </div>
        </div>

        <div className='socials-container'>
          <div className='socials'>
            <i className='fa-brands fa-facebook-f'></i>
            <i className='fa-brands fa-twitter'></i>
            <i className='fa-brands fa-instagram'></i>
            <i className='fa-brands fa-youtube'></i>
            <i className='fa-brands fa-pinterest'></i>
            <i className='fa-brands fa-snapchat'></i>
          </div>
          <p className='rights'>
            © 2020 Vespi. All rights reserved. This is a Process Masterclass
            lesson.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
