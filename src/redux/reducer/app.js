import { Record } from 'immutable'
import { TOGGLE_CART, LOGIN_SUCCESS } from '../constants'

const ReducerRecord = Record({
  showCart: true,
  token: localStorage.getItem('token') || null
})

export default (state = new ReducerRecord(), { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return state.set('token', payload.token)
    case TOGGLE_CART:
      return state.set('showCart', payload.value || !state.showCart)
    default:
      return state
  }
}
