import { createSelector } from 'reselect'

export const tokenSelector = (state) => state.app.token

export const showCartSelector = (state) => state.app.showCart

export const orderSelector = (state) => state.order

export const productsSelector = (state) => state.products.entities

export const productSelector = (id) =>
  createSelector(
    productsSelector,
    (products) => products.get(id)
  )

export const productsListSelector = createSelector(
  productsSelector,
  (products) => products.valueSeq().toArray()
)

export const orderedProductsSelector = createSelector(
  productsSelector,
  orderSelector,
  (products, order) => {
    return order
      .keySeq()
      .map((productId) => products.get(productId))
      .map((product) => ({
        product,
        amount: order.get(product.id)
      }))
  }
)

export const totalPriceSelector = createSelector(
  orderedProductsSelector,
  (orderedProducts) => {
    return orderedProducts.reduce(
      (acc, { product, amount }) => acc + product.price * amount,
      0
    )
  }
)
