import React, { useEffect } from 'react'
import { css } from 'astroturf'
import { useSelector, useDispatch } from 'react-redux'
import Layout from './common/Layout'
import Product from './Product'

import { fetchProducts } from '../redux/actions/products'

const styles = css`
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 123rem;
    margin: 0 auto;
  }

  .title {
    position: relative;
    color: rgb(49, 49, 49);
    font-size: 2.4rem;
    text-align: center;
    align-items: center;
    display: flex;
    margin: 0 0 4.5rem;

    &:before,
    &:after {
      content: '';
      display: block;
      flex-grow: 1;
      min-width: 2rem;
      border-bottom: 1px solid rgb(30, 48, 110);
    }

    &:before {
      margin-right: 2rem;
    }

    &:after {
      margin-left: 2rem;
    }
  }
`

export default function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.entities)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <Layout>
      <h3 className={styles.title}>BESTSELLERS</h3>
      <div className={styles.wrapper}>
        {products.map((product, index) => (
          <Product key={index} {...product} />
        ))}
      </div>
    </Layout>
  )
}
