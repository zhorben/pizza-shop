import { LOGIN_SUCCESS } from '../constants'

const initialState = {
  token: localStorage.getItem('token') || null
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return { ...state, token: payload.token }
    default:
      return state
  }
}
