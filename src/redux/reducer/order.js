import { TOGGLE_CART } from '../constants'

const initialState = {
  entities: [],
  showCart: false
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, entities: payload.products }
    case TOGGLE_CART:
      return { ...state, showCart: !state.showCart }
    default:
      return state
  }
}
