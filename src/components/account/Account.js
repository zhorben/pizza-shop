import './Account.scss'
import React, { useEffect } from 'react'
import History from './History'
import { useDispatch, useSelector } from 'react-redux'

import { fetchOrders } from '../../redux/actions/order'
import { orderHistorySelector } from '../../redux/selectors'

export default function Account() {
  const dispatch = useDispatch()
  const orders = useSelector(orderHistorySelector)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <div className="Account">
      <div className="Account__title">YOUR ORDERS</div>
      {orders.map((order) => (
        <History key={order.id} order={order} />
      ))}
    </div>
  )
}
