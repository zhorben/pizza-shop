import React from 'react'
import { css } from 'astroturf'

const styles = css`
  .button {
    background-color: rgb(30, 48, 110);
    border-radius: 0.5rem;
    color: #fff;
    cursor: pointer;
    font-size: 1.4rem;
    height: 3.6rem;
    margin: 0;
    padding: 0 1rem;
    text-align: center;
    min-width: 10rem;
    transition: background-color 150ms ease-out 0s;

    &:hover {
      background-color: rgb(82, 102, 153);
    }
  }
`

function RedButton({ children, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default RedButton
