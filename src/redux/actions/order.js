import {
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  REMOVE_PRODUCT
} from '../constants'

export const incrementProduct = (id) => ({
  type: INCREMENT_PRODUCT,
  payload: { id }
})

export const decrementProduct = (id) => ({
  type: DECREMENT_PRODUCT,
  payload: { id }
})

export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  payload: { id }
})
