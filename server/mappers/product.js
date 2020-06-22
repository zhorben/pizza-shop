module.exports = function mapProduct(product) {
  return {
    id: product.id,
    title: product.title,
    images: product.images,
    price: product.price,
    description: product.description
  }
}
