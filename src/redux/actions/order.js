import {
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  REMOVE_PRODUCT,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS
} from '../constants'

import { tokenSelector } from '../selectors'

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

export const fetchOrders = () => async (dispatch, getState) => {
  const state = getState()
  const token = tokenSelector(state)

  dispatch({ type: FETCH_ORDERS_REQUEST })

  const response = await fetch(`/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) throw new Error()
  const orders = await response.json()

  console.log(orders, '--- orders')

  dispatch({
    type: FETCH_ORDERS_SUCCESS,
    payload: orders
  })
}

export const checkout = (data) => async (dispatch, getState) => {
  const state = getState()
  const token = tokenSelector(state)

  dispatch({ type: CHECKOUT_REQUEST })

  let headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch('/api/orders', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })

  if (!response.ok) throw new Error()

  const order = await response.json()

  dispatch({
    type: CHECKOUT_SUCCESS,
    payload: order
  })
}
