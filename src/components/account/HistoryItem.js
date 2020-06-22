import React from 'react'
import './HistoryItem.scss'
import { useDispatch, useSelector } from 'react-redux'

import { productSelector } from '../../redux/selectors'

export default function HistoryItem({ id, amount }) {
  const { title, price } = useSelector(productSelector(id))

  return (
    <div className="HistoryItem">
      <div className="HistoryItem__title">
        {title} ({amount})
      </div>
      <div className="HistoryItem__price">{Math.floor(price * amount * 100) / 100} USD</div>
    </div>
  )
}
