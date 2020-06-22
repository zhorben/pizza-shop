const Order = require('../models/Order')
const mapOrder = require('../mappers/order')

module.exports.checkout = async function checkout(ctx, next) {
  const order = await Order.create({
    user: ctx.user,
    products: ctx.request.body.products
  })

  ctx.body = { order: order.id }
}

module.exports.getOrdersList = async function ordersList(ctx, next) {
  const orders = await Order.find({ user: ctx.user }).populate({
    path: 'products',
    populate: {
      path: 'product'
    }
  })

  ctx.body = { orders: orders.map(mapOrder) }
}
