import { FETCH_PRODUCTS_SUCCESS } from '../constants'

const initialState = {
  entities: []
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, entities: payload.products }
    default:
      return state
  }
}
