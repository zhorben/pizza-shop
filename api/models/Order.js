const mongoose = require('mongoose')
const connection = require('../libs/connection')

const productSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  amount: {
    type: Number,
    required: true
  }
})

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [productSchema],
  address: {
    type: String,
    required: true
  },
  firstName: String,
  email: {
    type: String,
    validate: [
      {
        validator(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value)
        },
        message: 'Некорректный email.'
      }
    ]
  }
})

module.exports = connection.model('Order', orderSchema)
