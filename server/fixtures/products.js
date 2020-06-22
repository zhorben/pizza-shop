const products = require('./data/products.json')

module.exports = products.map((product) => ({
  ...product,
  price: parseFloat(product.price),
  description: product.description.replace(/(<([^>]+)>)/gi, '')
}))
