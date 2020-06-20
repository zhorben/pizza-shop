import './App.scss'
import React from 'react'
import Header from './Header'
import ProductList from './products/ProductList'
import ShoppingCart from './order/ShoppingCart'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App__content">
        <ProductList />
        <ShoppingCart />
      </div>
    </div>
  )
}

export default App
