import './ShoppingCart.scss'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { format } from 'date-fns'
import OrderItem from './OrderItem'

import {
  showCartSelector,
  orderSelector,
  orderedProductsSelector,
  totalPriceSelector
} from '../../redux/selectors'

const API_EXCHANGE_URL = 'https://api.exchangeratesapi.io'

export default function ShoppingCart() {
  const [totalPriceEuro, setTotalEuro] = useState(null)
  const [springProps, set] = useSpring(() => ({ right: -460 })) // cart animation
  const showCart = useSelector(showCartSelector)
  const order = useSelector(orderSelector)
  const orderedProducts = useSelector(orderedProductsSelector)
  const totalPrice = useSelector(totalPriceSelector)

  useEffect(() => {
    set({ right: showCart ? 0 : -460 })
  }, [showCart])

  const convert = async (value, from, to, date) => {
    const dateQuery = format(date, 'yyyy-MM-dd')
    const baseQuery = from.toUpperCase()
    const symbolsQuery = to.toUpperCase()

    const response = await fetch(
      `${API_EXCHANGE_URL}/${dateQuery}?base=${baseQuery}&symbols=${symbolsQuery}`
    )
    const data = await response.json()

    const newValue = Math.floor(value * data.rates['EUR'] * 100) / 100

    setTotalEuro(newValue)
  }

  useEffect(() => {
    convert(totalPrice, 'USD', 'EUR', new Date())
  }, [totalPrice])

  return (
    <animated.div className="ShoppingCart" style={springProps}>
      <div className="ShoppingCart__title">
        YOUR CART {orderedProducts.size > 0 && `(${order.size})`}
      </div>

      {orderedProducts.size > 0 ? (
        <React.Fragment>
          <div className="ShoppingCart__list">
            {orderedProducts.map(({ product, amount }) => (
              <OrderItem key={product.id} product={product} amount={amount} />
            ))}
          </div>
          <div className="ShoppingCart__footer">
            <div className="ShoppingCart__total">
              <span className="ShoppingCart__total_title">Your total</span>
              <span className="ShoppingCart__total_price">
                {totalPrice} USD
              </span>
            </div>
            <div className="ShoppingCart__total">
              {totalPriceEuro && (
                <span className="ShoppingCart__total_price">
                  {totalPriceEuro} EUR
                </span>
              )}
            </div>
            <button
              disabled={totalPrice === 0}
              className="ShoppingCart__button"
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
