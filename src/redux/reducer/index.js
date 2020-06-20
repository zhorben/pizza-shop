import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../../history'
import products from './products'
import order from './order'
import app from './app'

export default combineReducers({
  router: connectRouter(history),
  products,
  order,
  app
})
