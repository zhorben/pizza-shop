import './Header.scss'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
  const pathname = useSelector((state) => state.router.location.pathname)
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

      {token ? (
        <div className="Header__container">
          {pathname !== '/account' && (
            <React.Fragment>
              <Link className="Header__button_account" to="/account">
                Account
              </Link>
              <CartSVG className="Header__icon" onClick={() => dispatch(toggleCart())} />
            </React.Fragment>
          )}

          <Button onClick={logout}>Log out</Button>
        </div>
      ) : (
        <Button onClick={() => toggleModal(true)}>Log in</Button>
      )}

      <LoginModal isOpen={isOpen} closeModal={() => toggleModal(false)} />
    </header>
  )
}
