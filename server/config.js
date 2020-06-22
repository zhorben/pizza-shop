const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  port: 3001,
  server: {
    siteHost: process.env.SITE_HOST
  },
  mongodb: {
    uri: 'mongodb://localhost/pizza'
  },
  crypto: {
    iterations: 12000,
    length: 128,
    digest: 'sha512'
  }
}
