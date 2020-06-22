import React from 'react'
import ProductList from './products/ProductList'
import ShoppingCart from '../order/ShoppingCart'

export default function Home() {
  return (
    <React.Fragment>
      <ProductList />
      <ShoppingCart />
    </React.Fragment>
  )
}
