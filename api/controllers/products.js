const Product = require('../models/Product')
const mapProduct = require('../mappers/product')

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find()
  ctx.body = { products: products.map(mapProduct) }
}
