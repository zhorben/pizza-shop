import './ShoppingCart.scss'
import React, { useEffect, useState } from 'react'
import { push } from 'connected-react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { format } from 'date-fns'
import OrderItem from './OrderItem'

import {
  showCartSelector,
  orderSelector,
  orderedProductsSelector,
  totalPriceSelector
} from '../../redux/selectors'

import { API_EXCHANGE_URL, FROM_CURRENCY, TO_CURRENCY, DELIVERY_RATES } from '../../constants'

export default function ShoppingCart() {
  const dispatch = useDispatch()
  const [totalPriceEuro, setTotalEuro] = useState(null)
  const [springProps, set] = useSpring(() => ({ right: -460 })) // cart animation
  const showCart = useSelector(showCartSelector)
  const order = useSelector(orderSelector)
  const orderedProducts = useSelector(orderedProductsSelector)
  const totalPrice = useSelector(totalPriceSelector)

  console.log(order.toJS(), '--- order')

  useEffect(() => {
    set({ right: showCart ? 0 : -460 })
  }, [showCart])

  const convert = async (value, date) => {
    const dateQuery = format(date, 'yyyy-MM-dd')
    const baseQuery = FROM_CURRENCY.toUpperCase()
    const symbolsQuery = TO_CURRENCY.toUpperCase()

    const response = await fetch(
      `${API_EXCHANGE_URL}/${dateQuery}?base=${baseQuery}&symbols=${symbolsQuery}`
    )
    const data = await response.json()

    const newValue = Math.floor(value * data.rates[TO_CURRENCY] * 100) / 100

    setTotalEuro(newValue)
  }

  useEffect(() => {
    convert(totalPrice, new Date())
  }, [totalPrice])

  return (
    <animated.div className="ShoppingCart" style={springProps}>
      <div className="ShoppingCart__title">
        YOUR CART {orderedProducts.size > 0 && `(${order.size})`}
      </div>

      {orderedProducts.size > 0 ? (
        <React.Fragment>
          <div className="ShoppingCart__list">
            {orderedProducts.map(({ product: id, amount }) => (
              <OrderItem key={id} id={id} amount={amount} />
            ))}
          </div>
          <div className="ShoppingCart__footer">
            <div className="ShoppingCart__total">
              <span className="ShoppingCart__total_title">Your total</span>
              <span className="ShoppingCart__total_price">{totalPrice} USD</span>
            </div>
            <div className="ShoppingCart__total">
              {!!totalPriceEuro && (
                <span className="ShoppingCart__total_price">{totalPriceEuro} EUR</span>
              )}
            </div>
            <div className="ShoppingCart__delivery">Delivery rates: {DELIVERY_RATES} USD</div>
            <button
              disabled={totalPrice === 0}
              className="ShoppingCart__button"
              onClick={() => dispatch(push('/checkout'))}
            >
              Checkout
            </button>
          </div>
        </React.Fragment>
      ) : (
        <div className="ShoppingCart__content_empty">
          A bit empty here. Add a delicious pizza to the basket!
        </div>
      )}
    </animated.div>
  )
}
