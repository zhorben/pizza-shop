import React, { useState } from 'react'
import { css } from 'astroturf'
import Button from './common/Button'
import LoginModal from './LoginModal'
import logo from '../images/logo.png'

const styles = css`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5.5rem;
    padding: 0 2rem;
  }

  .logo {
    height: 4rem;
  }
`

function Header() {
  const [isOpen, toggleModal] = useState(true)

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo} />
      <Button onClick={() => toggleModal(true)}>Log in</Button>

      <LoginModal isOpen={isOpen} closeModal={() => toggleModal(false)} />
    </div>
  )
}

export default Header
