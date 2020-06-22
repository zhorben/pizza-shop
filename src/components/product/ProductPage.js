import './ProductPage.scss'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import ShoppingCart from '../order/ShoppingCart'
import GoBack from '../common/GoBack'

import { toggleCart } from '../../redux/actions/app'
import { incrementProduct } from '../../redux/actions/order'
import { productSelector } from '../../redux/selectors'
import { showCartSelector } from '../../redux/selectors'

export default function ProductPage({ match }) {
  const dispatch = useDispatch()
  const product = useSelector(productSelector(match.params.id))
  const showCart = useSelector(showCartSelector)
  const springProps = useSpring({ shoppingCartWidth: showCart ? 460 : 0 })

  if (!product) return null

  const handleClick = () => {
    dispatch(incrementProduct(match.params.id))
    dispatch(toggleCart(true))
  }

  return (
    <div className="ProductPage">
      <animated.div
        className="ProductPage__container"
        style={{
          maxWidth: springProps.shoppingCartWidth.interpolate((width) => `calc(100% - ${width}px)`)
        }}
      >
        <GoBack />
        <div className="ProductPage__wrapper">
          <div className="ProductPage__image">
            <img src={product.images[0]} alt="product" />
          </div>
          <div className="ProductPage__content">
            <div className="ProductPage__title">
              <h2>{product.title}</h2>
              <div className="ProductPage__price">{product.price} USD</div>
              <button className="ProductPage__button" onClick={handleClick}>
                Add to cart
              </button>
            </div>
            <h4>Ingredients</h4>
            <div className="ProductPage__text">{product.description}</div>
          </div>
        </div>
      </animated.div>

      <ShoppingCart />
    </div>
  )
}
