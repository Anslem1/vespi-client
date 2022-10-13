import React from 'react'
import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import MobileNavLink from './MobileNavLink'

function MobileNavigation () {
  const [viewMenu, setViewMenu] = useState(false)

  const openMenu = (
    <FiMenu
      className='FiMenu'
      size='35px'
      onClick={() => setViewMenu(prevViewMenu => !prevViewMenu)}
    />
  )
  const closeMenu = (
    <AiOutlineClose
      className='FiMenu'
      size='40px'
      onClick={() => setViewMenu(prevViewMenu => !prevViewMenu)}
    />
  )

  return (
    <>
      <div className='hamburger'>
        {viewMenu ? closeMenu : openMenu}
      <MobileNavLink viewMenu={viewMenu} />
        </div>
    </>
  )
}

export default MobileNavigation
