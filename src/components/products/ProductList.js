import './ProductList.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'
import { useSpring, animated } from 'react-spring'

import { showCartSelector, productsListSelector } from '../../redux/selectors'

export default function ProductList() {
  const products = useSelector(productsListSelector)
  const showCart = useSelector(showCartSelector)
  const springProps = useSpring({ shoppingCartWidth: showCart ? 460 : 0 })

  return (
    <animated.div
      className="ProductList"
      style={{
        transform: springProps.shoppingCartWidth.interpolate(
          (width) => `translate(calc(-50% - ${width / 2}px), 0)`
        )
      }}
    >
      <h3 className="ProductList__title">BESTSELLERS</h3>
      <div className="ProductList__content">
        {products.map((product, index) => (
          <Product key={index} id={product.id} />
        ))}
      </div>
    </animated.div>
  )
}
