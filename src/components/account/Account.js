import './Account.scss'
import React, { useEffect } from 'react'
import History from './History'
import { useDispatch, useSelector } from 'react-redux'

import { fetchOrders } from '../../redux/actions/order'
import { fetchProducts } from '../../redux/actions/products'
import { orderHistorySelector } from '../../redux/selectors'

export default function Account() {
  const dispatch = useDispatch()
  const orders = useSelector(orderHistorySelector)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchOrders())
  }, [])

  return (
    <div className="Account">
      <div className="Account__title">YOUR ORDERS</div>
      {orders.map((order) => (
        <History key={order.id} order={order} />
      ))}
    </div>
  )
}
