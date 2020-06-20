import React from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as RemoveSVG } from '../../images/remove.svg'

import {
  incrementProduct,
  decrementProduct,
  removeProduct
} from '../../redux/actions/order'

export default function OrderItem({
  product: { id, title, price, description },
  amount
}) {
  const dispatch = useDispatch()

  return (
    <div className="OrderItem">
      <div className="OrderItem__title">
        {title}
        <RemoveSVG
          className="OrderItem__icon_remove"
          onClick={() => dispatch(removeProduct(id))}
        />
      </div>
      <div className="OrderItem__description">{description}</div>
      <div className="OrderItem__footer">
        <div className="OrderItem__actions">
          <button onClick={() => dispatch(decrementProduct(id))}>-</button>
          <div>{amount}</div>
          <button onClick={() => dispatch(incrementProduct(id))}>+</button>
        </div>
        <div className="OrderItem__price">{price} USD</div>
      </div>
    </div>
  )
}
