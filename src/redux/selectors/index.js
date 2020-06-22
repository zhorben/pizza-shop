import { createSelector } from 'reselect'
import { DELIVERY_RATES } from '../../constants'

export const tokenSelector = (state) => state.app.token

export const showCartSelector = (state) => state.app.showCart

export const ordersSelector = (state) => state.app.orders

export const orderSelector = (state) => state.order

export const productsSelector = (state) => state.products.entities

export const loadedProductsSelector = (state) => state.products.loaded

export const productAmountSelector = (id) =>
  createSelector(
    orderSelector,
    (order) => (order.has(id) ? order.get(id) : 0)
  )

export const productSelector = (id) =>
  createSelector(
    productsSelector,
    loadedProductsSelector,
    (products, loaded) => (loaded ? products.get(id) : null)
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
        product: product.id,
        price: product.price,
        amount: order.get(product.id)
      }))
  }
)

export const totalPriceSelector = createSelector(
  orderedProductsSelector,
  (orderedProducts) => {
    const productsPrice = orderedProducts.reduce(
      (acc, { price, amount }) => acc + price * amount,
      0
    )

    if (productsPrice === 0) {
      return 0
    }

    const totalPrice = Math.floor((productsPrice + DELIVERY_RATES) * 100) / 100

    return totalPrice
  }
)

export const orderHistorySelector = createSelector(
  ordersSelector,
  (orders) => orders.valueSeq().toArray()
)

export const orderHistoryTotalPriceSelector = (id) =>
  createSelector(
    ordersSelector,
    (orders) => {
      const order = orders.get(id)
      const productsPrice = order.products.reduce(
        (acc, { product, amount }) => acc + product.price * amount,
        0
      )
      const totalPrice = Math.floor((productsPrice + DELIVERY_RATES) * 100) / 100
      return totalPrice
    }
  )
