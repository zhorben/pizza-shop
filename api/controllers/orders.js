const Order = require('../models/Order')
const Product = require('../models/Product')
const mapOrder = require('../mappers/order')
const mapOrderConfirmation = require('../mappers/orderConfirmation')

module.exports.checkout = async function checkout(ctx, next) {
  const order = await Order.create({
    user: ctx.user,
    product: ctx.request.body.product,
    phone: ctx.request.body.phone,
    address: ctx.request.body.address
  })

  const product = await Product.findById(order.product)

  ctx.body = { order: order.id }
}

module.exports.getOrdersList = async function ordersList(ctx, next) {
  const orders = await Order.find({ user: ctx.user }).populate('product')
  ctx.body = { orders: orders.map(mapOrder) }
}
