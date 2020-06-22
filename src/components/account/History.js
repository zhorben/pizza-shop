import React from 'react'
import { useSelector } from 'react-redux'
import OrderItem from './HistoryItem'
import { orderHistoryTotalPriceSelector } from '../../redux/selectors'

export default function OrderHistory({ order }) {
  const totalPrice = useSelector(orderHistoryTotalPriceSelector(order.id))

  return (
    <div className="OrderHistory">
      {order.products.map(({ product, amount }) => (
        <OrderItem key={product.id} id={product.id} amount={amount} isOrderHistory />
      ))}
      <div>
        <div className="OrderHistory__total">
          <span className="OrderHistory__total_title">Total:</span>
          <span className="OrderHistory__total_price">{totalPrice} USD</span>
        </div>
      </div>
    </div>
  )
}
