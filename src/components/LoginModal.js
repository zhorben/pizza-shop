import './LoginModal.scss'
import React from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Modal from 'react-modal'
import closeIcon from '../images/close.svg'

import { login } from '../redux/actions/app'

// http://reactcommunity.org/react-modal/styles/ - default styles
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 107
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50rem',
    borderRadius: '0.4rem',
    minHeight: '5.5rem',
    border: 'none',
    padding: '5rem'
  }
}

export default function LoginModal({ isOpen, closeModal }) {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    await dispatch(login(event))
    closeModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <div className="LoginModal">
        <img className="LoginModal__icon_close" src={closeIcon} onClick={closeModal} alt="close" />

        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
          {({ errors, touched }) => {
            return (
              <Form>
                <h2 className="LoginModal__title">LOG IN</h2>

                <div className="inputWrapper">
                  <div className="label">E-MAIL ADDRESS</div>
                  <Field
                    required
                    name="email"
                    type="email"
                    placeholder="e.g. johnsmith@example.com"
                    className={cx({ invalid: errors.email && touched.email })}
                    validate={(value) => (!value ? 'Required Field' : undefined)}
                  />
                  <ErrorMessage name="email" render={(msg) => <div className="error">{msg}</div>} />
                </div>

                <div>
                  <div className="label">PASSWORD</div>
                  <Field
                    required
                    name="password"
                    type="password"
                    placeholder="*****"
                    className={cx({ invalid: errors.password && touched.password })}
                    validate={(value) => (!value ? 'Required Field' : undefined)}
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => <div className="error">{msg}</div>}
                  />
                </div>

                <button type="submit" disabled={errors.email || errors.password}>
                  Log in
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Modal>
  )
}
