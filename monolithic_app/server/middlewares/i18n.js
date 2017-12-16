import i18n from '../common/i18n'
export class I18n {
  async setLocale (req, res, next) {
    if (i18n.availableLocales().includes(req.params.lang)) {
      i18n.locale(req.params.lang)
      next()
    } else {
      return res.redirect(`/${i18n.locale()}/`)
    }
  }
}

export default new I18n()
