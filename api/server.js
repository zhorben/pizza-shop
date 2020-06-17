const path = require('path')
const { v4: uuidv4 } = require('uuid')
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const handleMongooseValidationError = require('./libs/validationErrors')
const mustBeAuthenticated = require('./libs/mustBeAuthenticated')

const { login } = require('./controllers/login')
const { me } = require('./controllers/me')
const {
  productsBySubcategory,
  productsByQuery,
  productList,
  productById
} = require('./controllers/products')
const { checkout, getOrdersList } = require('./controllers/orders')

const app = new Koa()

const Session = require('./models/Session')

app.use(require('koa-static')(path.join(__dirname, 'public')))
app.use(require('koa-bodyparser')())
app.use(cors())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.status) {
      ctx.status = err.status
      ctx.body = { error: err.message }
    } else {
      console.error(err)
      ctx.status = 500
      ctx.body = { error: 'Internal server error' }
    }
  }
})

app.use((ctx, next) => {
  ctx.login = async function(user) {
    const token = uuidv4()
    await Session.create({ token, user, lastVisit: new Date() })

    return token
  }

  return next()
})

const router = new Router({ prefix: '/api' })

router.use(async (ctx, next) => {
  const header = ctx.request.get('Authorization')
  if (!header) return next()

  const token = header.split(' ')[1]
  if (!token) return next()

  const session = await Session.findOne({ token }).populate('user')
  if (!session) {
    ctx.throw(401, 'Неверный аутентификационный токен')
  }
  session.lastVisit = new Date()
  await session.save()

  ctx.user = session.user
  return next()
})

router.post('/login', login)
router.get('/me', mustBeAuthenticated, me)

router.get('/products', productsBySubcategory, productsByQuery, productList)
router.get('/products', productsBySubcategory, productList)
router.get('/products/:id', productById)

router.get('/orders', mustBeAuthenticated, getOrdersList)
router.post(
  '/orders',
  mustBeAuthenticated,
  handleMongooseValidationError,
  checkout
)

app.use(router.routes())

// this for HTML5 history in browser
// const fs = require('fs')

// const index = fs.readFileSync(path.join(__dirname, 'public/index.html'))
// app.use(async (ctx) => {
//   if (ctx.url.startsWith('/api') || ctx.method !== 'GET') return

//   ctx.set('content-type', 'text/html')
//   ctx.body = index
// })

module.exports = app
