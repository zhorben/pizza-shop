const products = require('./data/products.json')

module.exports = products.map((product) => ({
  ...product,
  price: parseInt(product.price),
  description: product.description.replace(/(<([^>]+)>)/gi, ''),
  rating: Math.floor(Math.random() * 2) + 3
}))
