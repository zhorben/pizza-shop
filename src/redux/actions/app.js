import { LOGIN_REQUEST, LOGIN_SUCCESS, TOGGLE_CART } from '../constants'

export const login = (event) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  })

  if (!response.ok) throw new Error()

  const token = await response.json()

  dispatch({
    type: LOGIN_SUCCESS,
    payload: { token }
  })
}

export const toggleCart = (value) => ({
  type: TOGGLE_CART,
  payload: { value }
})
