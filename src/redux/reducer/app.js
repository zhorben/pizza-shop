import { Record, OrderedMap } from 'immutable'
import { arrToImmutableMap } from '../utils'
import { TOGGLE_CART, LOGIN_SUCCESS, FETCH_ORDERS_SUCCESS } from '../constants'

const OrderRecord = Record({
  id: null,
  products: []
})

const ReducerRecord = Record({
  showCart: false,
  token: localStorage.getItem('token') || null,
  orders: new OrderedMap()
})

export default (state = new ReducerRecord(), { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return state.set('token', payload.token)
    case TOGGLE_CART:
      return state.set('showCart', payload.value || !state.showCart)
    case FETCH_ORDERS_SUCCESS:
      return state.update('orders', (orders) =>
        orders.merge(arrToImmutableMap(payload.orders, OrderRecord))
      )
    default:
      return state
  }
}
