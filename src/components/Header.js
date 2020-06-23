import './Header.scss'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Button from './common/Button'
import LoginModal from './LoginModal'
import logo from '../images/logo.png'
import { ReactComponent as CartSVG } from '../images/cart.svg'

import { toggleCart } from '../redux/actions/app'
import { tokenSelector, orderedProductsSelector } from '../redux/selectors'

export default function Header() {
  const [isOpen, toggleModal] = useState(false)
  const token = useSelector(tokenSelector)
  const pathname = useSelector((state) => state.router.location.pathname)
  const orderedProducts = useSelector(orderedProductsSelector)
  const dispatch = useDispatch()

  const logout = async () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <header className="Header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      <div className="Header__container">
        {token && pathname !== '/account' && (
          <Link className="Header__button_account" to="/account">
            Account
          </Link>
        )}

        <div className="Header__icon">
          <CartSVG onClick={() => dispatch(toggleCart())} />
          {orderedProducts.size > 0 && <span>{orderedProducts.size}</span>}
        </div>

        {token ? (
          <Button onClick={logout}>Log out</Button>
        ) : (
          <Button onClick={() => toggleModal(true)}>Log in</Button>
        )}
      </div>

      <LoginModal isOpen={isOpen} closeModal={() => toggleModal(false)} />
    </header>
  )
}
