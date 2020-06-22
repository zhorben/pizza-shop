import React from 'react'
import GoBack from '../common/GoBack'
import ShoppingCart from '../order/ShoppingCart'

export default function Confirm() {
  return (
    <div className="Checkout">
      <div className="Checkout__container Checkout__container_confirm">
        <GoBack />
        <div className="Checkout__text">Congratulations! Your order has been placed.</div>
        <ShoppingCart />
      </div>
    </div>
  )
}
