import { Map } from 'immutable'
import {
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  REMOVE_PRODUCT,
  CHECKOUT_SUCCESS
} from '../constants'

// {[productId]: amount}
export default (state = new Map({}), { type, payload }) => {
  switch (type) {
    case INCREMENT_PRODUCT:
      return state.update(payload.id, 0, (amount) => amount + 1)
    case DECREMENT_PRODUCT:
      return state.update(payload.id, 0, (amount) => Math.max(amount - 1, 0))
    case REMOVE_PRODUCT:
      return state.delete(payload.id)
    case CHECKOUT_SUCCESS:
      return (state = new Map({}))
    default:
      return state
  }
}
