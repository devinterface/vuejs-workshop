import Express from 'express'
import morgan from 'morgan' // used to log HTTP Requests
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import * as os from 'os'
import cookieParser from 'cookie-parser'
import l from './logger'
import compression from 'compression'
import expressValidator from 'express-validator'
import session from 'express-session'
import redis from 'redis'
import passport from 'passport'
import sassMiddleware from 'node-sass-middleware'
import flash from 'express-flash-2'
import i18n from './i18n'
import url from './urlBuilder'
// Passport OAuth strategies
require('./passport')

const app = new Express()

const redisClient = redis.createClient()
const RedisStore = require('connect-redis')(session)

export default class ExpressServer {
  constructor () {
    const root = path.normalize(`${__dirname}/../..`)
    app.set('appPath', `${root}client`)
    app.set('views', path.join(root, 'views'))
    app.set('view engine', 'pug')

    if (process.env.ENABLE_HTTP_LOGGER === 'true') app.use(morgan('combined'))

    app.use(compression())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(expressValidator())
    app.use(cookieParser(process.env.SESSION_SECRET))
    app.use(sassMiddleware({
      src: path.join(__dirname, 'public'),
      dest: path.join(__dirname, 'public'),
      indentedSyntax: true, // true = .sass and false = .scss
      sourceMap: true
    }))
    app.use(Express.static(`${root}/public`))
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        client: redisClient,
        ttl: 2600,
        db: 11
      })
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    app.use(function (req, res, next) {
      res.locals.user = req.user ? req.user.toJSON() : null
      res.locals.url = url
      res.locals.i18n = i18n
      next()
    })
  }

  router (routes) {
    routes(app)
    return this
  }

  listen (port = process.env.PORT) {
    const welcome = p => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`)
    http.createServer(app).listen(port, welcome(port))
    return app
  }
}
