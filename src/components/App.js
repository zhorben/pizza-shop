import './App.scss'
import './Form.scss'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './Header'
import { Route, Switch } from 'react-router-dom'
import Home from './home/Home'
import Account from './account/Account'
import ProductPage from './product/ProductPage'
import Checkout from './checkout/Checkout'
import CheckoutConfirm from './checkout/Confirm'

import { fetchProducts } from '../redux/actions/products'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <div className="App">
      <Header />
      <div className="App__content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/account" component={Account} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/checkout/confirm" component={CheckoutConfirm} />
          <Route path="/product/:id" component={ProductPage} />
        </Switch>
      </div>
    </div>
  )
}

export default App
