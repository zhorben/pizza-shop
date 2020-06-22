import './Checkout.scss'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import cx from 'classnames'
import GoBack from '../common/GoBack'
import ShoppingCart from '../order/ShoppingCart'

import { orderedProductsSelector, tokenSelector, totalPriceSelector } from '../../redux/selectors'
import { checkout } from '../../redux/actions/order'
import { toggleCart } from '../../redux/actions/app'
import { Redirect } from 'react-router-dom'

export default function Checkout() {
  const dispatch = useDispatch()
  const products = useSelector(orderedProductsSelector)
  const token = useSelector(tokenSelector)
  const totalPrice = useSelector(totalPriceSelector)

  useEffect(() => {
    if (products.size !== 0) {
      dispatch(toggleCart(true))
    }
  }, [])

  const handleSubmit = async (event) => {
    if (token) {
      delete event.firstName
      delete event.email
    }

    dispatch(checkout({ products, ...event }))
  }

  if (products.size === 0) return <Redirect to="/" />

  return (
    <div className="Checkout">
      <div className="Checkout__container">
        <GoBack />
        <Formik initialValues={{ email: '', firstName: '', address: '' }} onSubmit={handleSubmit}>
          {({ errors, touched }) => {
            return (
              <Form>
                <h2>YOUR DATA</h2>

                {!token && (
                  <div className="inputWrapper">
                    <div className="label">E-MAIL ADDRESS*</div>
                    <Field
                      required
                      name="email"
                      type="email"
                      placeholder="e.g. johnsmith@example.com"
                      className={cx({ invalid: errors.email && touched.email })}
                      validate={(value) => (!value ? 'Required Field' : undefined)}
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => <div className="error">{msg}</div>}
                    />
                  </div>
                )}

                {!token && (
                  <div className="inputWrapper">
                    <div className="label">FIRST NAME*</div>
                    <Field
                      required
                      name="firstName"
                      type="text"
                      placeholder="e.g. Jhon"
                      className={cx({ invalid: errors.firstName && touched.firstName })}
                      validate={(value) => (!value ? 'Required Field' : undefined)}
                    />
                    <ErrorMessage
                      name="firstName"
                      render={(msg) => <div className="error">{msg}</div>}
                    />
                  </div>
                )}

                <div>
                  <div className="label">ADDRESS*</div>
                  <Field
                    required
                    name="address"
                    type="text"
                    placeholder="e.g. Moscow, Maroseyka 2, 13"
                    className={cx({ invalid: errors.address && touched.address })}
                    validate={(value) => (!value ? 'Required Field' : undefined)}
                  />
                  <ErrorMessage
                    name="address"
                    render={(msg) => <div className="error">{msg}</div>}
                  />
                </div>

                <button
                  type="submit"
                  disabled={errors.email || errors.password}
                  className="LoginModal__button"
                >
                  Order <span>{totalPrice} USD</span>
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
      <ShoppingCart />
    </div>
  )
}
