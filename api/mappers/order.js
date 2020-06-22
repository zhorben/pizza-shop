const mapProduct = require('./product')

module.exports = function mapOrder(order) {
  return {
    id: order.id,
    products: order.products.map((item) => ({
      product: mapProduct(item.product),
      amount: item.amount
    }))
  }
}
