import React from 'react'
import './OrderItem.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as RemoveSVG } from '../../../images/remove.svg'

import { incrementProduct, decrementProduct, removeProduct } from '../../../redux/actions/order'

import { productSelector } from '../../../redux/selectors'

export default function OrderItem({ id, amount }) {
  const dispatch = useDispatch()
  const { title, price, description } = useSelector(productSelector(id))

  return (
    <div className="OrderItem">
      <div className="OrderItem__title">
        {title}
        <RemoveSVG className="OrderItem__icon_remove" onClick={() => dispatch(removeProduct(id))} />
      </div>
      <div className="OrderItem__description">{description}</div>
      <div className="OrderItem__footer">
        <div className="OrderItem__actions">
          <button onClick={() => dispatch(decrementProduct(id))}>-</button>
          <div>{amount}</div>
          <button onClick={() => dispatch(incrementProduct(id))}>+</button>
        </div>
        <div className="OrderItem__price">{Math.floor(price * amount * 100) / 100} USD</div>
      </div>
    </div>
  )
}
