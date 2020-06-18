import React from 'react'
import { css } from 'astroturf'

const styles = css`
  .layout {
    margin: 0 auto;
    padding: 4.5rem 4rem;
    max-width: 104rem;
  }
`

export default function Layout({ children }) {
  return <div className={styles.layout}>{children}</div>
}
