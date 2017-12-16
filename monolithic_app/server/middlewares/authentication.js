import url from '../common/urlBuilder'

export class Authentication {
  async ensureAdmin (req, res, next) {
    if (req.isAuthenticated() && req.user.attributes.role === 0) {
      next()
    } else {
      res.redirect(url(req, '/login'))
    }
  }

  async ensureAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect(url(req, '/login'))
    }
  }

  async ensureApiAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(403).end()
    }
  }
}

export default new Authentication()
