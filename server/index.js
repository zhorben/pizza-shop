const config = require('./config')
const app = require('./app')

const port = parseInt(config.port, 10) || 3000

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
