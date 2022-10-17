import React from 'react'
import bottomLogos from './bottomLogo'
import bottomBodyImgs from './bottom-body-imgs'
import Emailus from './email-us/email-us'
import './Bottombody.css'

function bodyQuoteEmail () {
  const bottomBodyElement = bottomBodyImgs.map(bottomBodyImg => {
    return <img src={bottomBodyImg.gramimg} />
  })

  const bottomBodyLogoElement = bottomLogos.map(logo => {
    return (
      <>
        <img src={logo.logo} />
      </>
    )
  })

  return (
    <>
      <h5 className='learn-about-us'>Learn about us</h5>

      <div className='quote-company'>
        <h4>
          “Beautiful collection of indie American brands <br /> at a fair price”
        </h4>
        <div className='logo-container'>{bottomBodyLogoElement}</div>
      </div>
      <div className='line'></div>
      <div className='on-the-gram'>
        <p>On the gram</p>
        <p className='follow-us'>
          Follow us on the gram
          <i className='fa-brands instagram fa-instagram'></i>
        </p>
      </div>
      <div className='gram-container'>{bottomBodyElement}</div>

      <Emailus />
    </>
  )
}

export default bodyQuoteEmail
