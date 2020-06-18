const User = require('../models/User')
const Product = require('../models/Product')
const connection = require('../libs/connection')
const users = require('./users')
const products = require('./products')

;(async () => {
  await User.deleteMany()
  await Product.deleteMany()

  for (const user of users) {
    const u = new User(user)
    await u.setPassword(user.password)
    await u.save()
  }

  for (const product of products) {
    await Product.create({
      title: product.title,
      description: product.description,
      price: product.price,
      currency: product.currency,
      images: product.images
    })
  }

  connection.close()

  console.log(`${users.length} users have been saved in DB`)
  console.log(`${products.length} products have been saved in DB`)
})()
