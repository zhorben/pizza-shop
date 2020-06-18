import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../../history'
import auth from './auth'
import products from './products'
import order from './order'

export default combineReducers({
  router: connectRouter(history),
  auth,
  products,
  order
})
