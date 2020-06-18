const { format } = require('date-fns')

const API_EXCHANGE_URL = 'https://api.exchangeratesapi.io'

module.exports = async function convert(value, from, to, date) {
  const dateQuery = format(date, 'yyyy-MM-dd')
  const baseQuery = from.toUpperCase()
  const symbolsQuery = to.toUpperCase()

  const response = await fetch(
    `${API_EXCHANGE_URL}/${dateQuery}?base=${baseQuery}&symbols=${symbolsQuery}`
  )
  const rate = await response.json()

  return value * rate
}
