// APP ROUTES
import publicAppRouter from './app/public/router'
import accountAppRouter from './app/account/router'
import postsAppRouter from './app/posts/router'
import oauthAppRouter from './app/oauth/router'

import I18n from './middlewares/i18n'

export default function routes (app) {
  // APP ROUTES
  app.use('/auth', oauthAppRouter)
  app.use('/:lang/', I18n.setLocale, publicAppRouter)
  app.use('/:lang/', I18n.setLocale, accountAppRouter)
  app.use('/:lang/posts', I18n.setLocale, postsAppRouter)
  app.use('/', I18n.setLocale, publicAppRouter)
}
