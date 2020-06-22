import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { toggleCart } from '../../redux/actions/app'
import { incrementProduct } from '../../redux/actions/order'

import { productSelector } from '../../redux/selectors'

export default function Product({ id }) {
  const dispatch = useDispatch()
  const { title, description, price, images } = useSelector(productSelector(id))

  const handleClick = () => {
    dispatch(incrementProduct(id))
    dispatch(toggleCart(true))
  }

  return (
    <div className="Product">
      <Link className="Product__link_image" to={`/product/${id}`}>
        <div className="Product__container_image">
          <img className="Product__image" src={images[0]} />
        </div>
      </Link>
      <div className="Product__content">
        <div className="Product__title">{title}</div>
        <p className="Product__description">{description}</p>
      </div>
      <div className="Product__footer">
        <span className="Product__price">{price} USD</span>
        <button className="Product__button" onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  )
}
