import { OrderedMap, Record } from 'immutable'
import { arrToImmutableMap } from '../utils'

import { FETCH_PRODUCTS_SUCCESS } from '../constants'

const ProductRecord = Record({
  id: null,
  title: '',
  description: '',
  price: null,
  images: []
})

const ReducerRecord = Record({
  entities: new OrderedMap(),
  loaded: false
})

export default function reducer(state = new ReducerRecord(), { type, payload }) {
  switch (type) {
    case FETCH_PRODUCTS_SUCCESS:
      return state
        .update('entities', (entities) =>
          entities.merge(arrToImmutableMap(payload.products, ProductRecord))
        )
        .set('loaded', true)
    default:
      return state
  }
}
