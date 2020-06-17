import React from 'react'
import cx from 'classnames'
import { css } from 'astroturf'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Modal from 'react-modal'
import closeIcon from '../images/close.svg'

// http://reactcommunity.org/react-modal/styles/ - default styles
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
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

const styles = css`
  .title {
    font-family: 'Barlow Condensed', sans-serif;
  }

  .close {
    height: 2.5rem;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .button {
    background-color: rgb(130, 179, 0);
    color: rgb(255, 255, 255);
    cursor: pointer;
    font-family: 'Open Sans';
    font-size: 1.4rem;
    height: 4.4rem;
    text-align: center;
    width: 100%;
    border-style: none;
    border-radius: 0.5rem;
    margin: 2rem 0px 0px;
    padding: 0px 1rem;

    &:disabled {
      background-color: rgb(130, 179, 0);
      color: rgb(255, 255, 255);
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .label {
    color: rgb(122, 133, 141);
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .input {
    width: 100%;
    display: block;
    background-color: rgb(248, 248, 249);
    color: rgb(0, 0, 0);
    font-family: 'Open Sans';
    font-size: 1.4rem;
    height: 4.4rem;
    border-style: solid;
    border-color: transparent;
    border-radius: 0.5rem;
    padding: 0px 4.4rem 0px 1rem;
    border-width: 2px;

    &.invalid {
      border-color: rgb(200, 16, 46);
    }
  }

  .error {
    color: rgb(200, 16, 46);
    font-size: 1.2rem;
    margin: 1rem 0px 0px;
  }

  .inputWrapper {
    margin-bottom: 2rem;
  }
`

function LoginModal({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <img className={styles.close} src={closeIcon} onClick={closeModal} />

      <Formik initialValues={{ email: '', password: '' }} onSubmit={() => null}>
        {({ errors, touched }) => {
          return (
            <Form>
              <h2 className={styles.title}>LOG IN</h2>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>E-MAIL ADDRESS</div>
                <Field
                  required
                  name="email"
                  type="email"
                  placeholder="e.g. johnsmith@example.com"
                  className={cx(
                    styles.input,
                    errors.email && touched.email && styles.invalid
                  )}
                  validate={(value) => (!value ? 'Required Field' : undefined)}
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => <div className={styles.error}>{msg}</div>}
                />
              </div>

              <div>
                <div className={styles.label}>PASSWORD</div>
                <Field
                  required
                  name="password"
                  type="password"
                  placeholder="*****"
                  className={cx(
                    styles.input,
                    errors.password && touched.password && styles.invalid
                  )}
                  validate={(value) => (!value ? 'Required Field' : undefined)}
                />
                <ErrorMessage
                  name="password"
                  render={(msg) => <div className={styles.error}>{msg}</div>}
                />
              </div>

              <button
                disabled={errors.email || errors.password}
                className={styles.button}
                type="submit"
              >
                Log in
              </button>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default LoginModal
