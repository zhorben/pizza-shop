import './App.scss'
import React from 'react'
import Header from './Header'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Account from './account/Account'
import Product from './product/Product'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App__content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/account" component={Account} />
          <Route path="/prodcut/:id" component={Product} />
        </Switch>
      </div>
    </div>
  )
}

export default App
