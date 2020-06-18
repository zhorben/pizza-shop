import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'astroturf'
import Button from './common/Button'
import LoginModal from './LoginModal'
import logo from '../images/logo.png'
import { ReactComponent as CartSVG } from '../images/cart.svg'

const styles = css`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5.5rem;
    padding: 0 2rem;
    border-bottom: 1px solid #e9ebee;
  }

  .logo {
    height: 4rem;
  }

  .cartWrapper {
    display: flex;
    align-items: center;
  }

  .icon {
    width: 24px;
    height: 18px;
    padding: 5px;
    box-sizing: content-box;
    margin-right: 2rem;
    cursor: pointer;
  }
`

export default function Header() {
  const [isOpen, toggleModal] = useState(false)
  const token = useSelector((state) => state.auth.token)

  const logout = async () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo} />

      {token ? (
        <div className={styles.cartWrapper}>
          <CartSVG className={styles.icon} />
          <Button onClick={logout}>Log out</Button>
        </div>
      ) : (
        <Button onClick={() => toggleModal(true)}>Log in</Button>
      )}

      <LoginModal isOpen={isOpen} closeModal={() => toggleModal(false)} />
    </div>
  )
}
