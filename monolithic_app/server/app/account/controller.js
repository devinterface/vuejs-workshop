import passport from 'passport'
import transporter from '../../common/transporter'
import l from '../../common/logger'
import User from '../../models/User'
import pug from 'pug'
import crypto from 'crypto-promise'
import i18n from '../../common/i18n'
import url from '../../common/urlBuilder'
import Sequelize from 'sequelize'

class Controller {
  async loginGet (req, res) {
    if (req.user) {
      return res.redirect(url(req, '/'))
    }
    res.render('account/login', {
      title: i18n.t('sign_in.title')
    })
  }

  async loginPost (req, res, next) {
    req.check('email').notEmpty().isEmail().withMessage(i18n.t('errors.invalid')).trim().normalizeEmail({remove_dots: false})
    req.check('password').notEmpty().withMessage(i18n.t('errors.blank'))
    const errors = await req.getValidationResult()

    if (!errors.isEmpty()) {
      res.flash('errors', errors.array())
      return res.redirect(url(req, '/login'))
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json([])
      }
      if (!user) {
        res.flash('errors', [info])
        return res.redirect(url(req, '/login'))
      }
      req.logIn(user, () => {
        res.redirect(url(req, '/'))
      })
    })(req, res, next)
  }

  async logout (req, res) {
    req.logout()
    res.redirect(url(req, '/'))
  }

  async signupGet (req, res) {
    if (req.user) {
      return res.redirect(url(req, '/'))
    }
    res.render('account/signup', {
      title: i18n.t('sign_up.title')
    })
  }

  async signupPost (req, res, next) {
    req.check('email', i18n.t('errors.invalid')).isEmail()
    req.check('email', i18n.t('errors.blank')).notEmpty()
    req.check('password', i18n.t('errors.must_be_greather_than', { val: '8' })).len(8)
    req.sanitize('email').normalizeEmail({
      remove_dots: false
    })
    const errors = await req.getValidationResult()
    if (!errors.isEmpty()) {
      res.flash('errors', errors.array())
      return res.redirect(url(req, '/signup'))
    }

    let user = new User({
      email: req.body.email,
      password: req.body.password
    })
    try {
      await user.save()
      req.logIn(user, () => {
        res.redirect(`/${i18n.locale()}/`)
      })
    } catch (err) {
      l.error(err)
      console.log('redirecting')
      console.log('redirecting')
      console.log('redirecting')
      console.log(req.i18n)
      res.redirect(url(req, '/signup'))
    }
  }

  /**
   * GET /forgot
   */
  async forgotGet (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect(url(req, '/'))
    }
    res.render('account/forgot', {
      title: i18n.t('forgot_password.title')
    })
  }

/**
 * POST /forgot
 */
  async forgotPost (req, res, next) {
    req.check('email', i18n.t('errors.invalid')).isEmail()
    req.check('email', i18n.t('errors.blank')).notEmpty()
    req.sanitize('email').normalizeEmail({
      remove_dots: false
    })

    const errors = await req.getValidationResult()

    if (!errors.isEmpty()) {
      res.flash('errors', errors.array())
      return res.redirect(url(req, '/forgot'))
    }
    const buf = await crypto.randomBytes(16)
    const token = buf.toString('hex')
    let user = await User.findOne({ where: {email: req.body.email} })
    if (!user) {
      const error = {
        msg: i18n.t('forgot_password.email_not_present', { email: req.body.email })
      }
      res.flash('errors', [error])
      return res.redirect(url(req, '/forgot'))
    }
    user.set('passwordResetToken', token)
    user.set('passwordResetExpires', new Date(Date.now() + 3600000)) // expire in 1 hour
    await user.save()
    let emailText = pug.renderFile('views/mailer/modify_password.pug', {
      host: req.headers.host,
      token: token,
      locale: i18n.locale(),
      i18n: i18n
    })
    const mailOptions = {
      to: user.toJSON().email,
      from: process.env.DEFAULT_EMAIL_FROM,
      subject: i18n.t('forgot_password.title'),
      html: emailText
    }
    transporter.sendMail(mailOptions, () => {
      const info = i18n.t('forgot_password.email_sent')
      res.flash('info', info)
      res.redirect(url(req, '/forgot'))
    })
  }

/**
 * GET /reset
 */
  async resetGet (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect(url(req, '/'))
    }
    const Op = Sequelize.Op
    let user = await User.findOne({ where: {passwordResetToken: req.params.token,
      passwordResetExpires: {
        [Op.gt]: new Date()
      }
    }})
    if (!user) {
      const error = {
        msg: i18n.t('errors.invalid_token')
      }
      res.flash('errors', [error])
      return res.redirect(url(req, '/forgot'))
    }
    res.render('account/reset', {
      title: i18n.t('reset_password.title')
    })
  }

/**
 * POST /reset
 */
  async resetPost (req, res, next) {
    req.check('password', i18n.t('errors.must_be_greather_than', { val: '8' })).len(8)
    req.check('confirm', i18n.t('errors.must_match', { match: i18n.t('attributes.account.password') })).equals(req.body.password)

    const errors = await req.getValidationResult()

    if (!errors.isEmpty()) {
      res.flash('errors', errors.array())
      return res.redirect(url(req, `/reset/${req.params.token}`))
    }

    const Op = Sequelize.Op
    let user = await User.findOne({ where: {passwordResetToken: req.params.token,
      passwordResetExpires: {
        [Op.gt]: new Date()
      }
    }})

    if (!user) {
      const error = {
        msg: i18n.t('errors.invalid_token')
      }
      res.flash('errors', [error])
      return res.redirect('back')
    }
    user.set('password', req.body.password)
    user.set('passwordResetToken', null)
    user.set('passwordResetExpires', null)
    await user.save()
    await req.logIn(user, () => {
      Promise.resolve(user)
    })

    const userJson = user.toJSON()
    let emailText = pug.renderFile('views/mailer/confirm_modify_password.pug', {
      email: userJson.email,
      i18n: i18n
    })
    const mailOptions = {
      from: process.env.DEFAULT_EMAIL_FROM,
      to: userJson.email,
      subject: i18n.t('reset_password.modified.title'),
      html: emailText
    }
    transporter.sendMail(mailOptions, () => {
      const info = {
        msg: i18n.t('reset_password.modified.title')
      }
      res.flash('info', info)
      res.redirect(url(req, '/account'))
    })
  }
}

export default new Controller()
