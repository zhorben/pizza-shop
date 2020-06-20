import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from './common/Button'
import LoginModal from './LoginModal'
import logo from '../images/logo.png'
import { ReactComponent as CartSVG } from '../images/cart.svg'

import { toggleCart } from '../redux/actions/app'
import { tokenSelector } from '../redux/selectors'

export default function Header() {
  const [isOpen, toggleModal] = useState(false)
  const token = useSelector(tokenSelector)
  const dispatch = useDispatch()

  const logout = async () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <header className="Header">
      <img className="logo" src={logo} />

      {token ? (
        <div className="Header__container">
          <CartSVG
            className="Header__icon"
            onClick={() => dispatch(toggleCart())}
          />
          <Button onClick={logout}>Log out</Button>
        </div>
      ) : (
        <Button onClick={() => toggleModal(true)}>Log in</Button>
      )}

      <LoginModal isOpen={isOpen} closeModal={() => toggleModal(false)} />
    </header>
  )
}
