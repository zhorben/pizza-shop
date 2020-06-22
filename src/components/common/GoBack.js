import './GoBack.scss'
import React from 'react'
import { useDispatch } from 'react-redux'
import { goBack } from 'connected-react-router'
import { ReactComponent as BackSVG } from '../../images/back.svg'

export default function GoBack() {
  const dispatch = useDispatch()

  return (
    <div className="GoBack">
      <button onClick={() => dispatch(goBack())}>
        <BackSVG className="ProductPage__icon_back" />
        GO BACK
      </button>
    </div>
  )
}
