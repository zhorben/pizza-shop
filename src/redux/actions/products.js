import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from '../constants'

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST })

  const response = await fetch(`/api/products`)
  const products = await response.json()

  dispatch({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
  })
}
