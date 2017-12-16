import Polyglot from 'node-polyglot'

const defaultLocale = 'en'
const availableLocales = ['en', 'it']

const phrases = {
  en: require('../../locales/en.js'),
  it: require('../../locales/it.js')
}

const polyglot = new Polyglot({ defaultLocale, phrases })

class I18n {
  availableLocales () {
    return availableLocales
  }

  t (key, interpolationOptions) {
    if (!interpolationOptions) interpolationOptions = {}
    return polyglot.t(`${polyglot.locale()}.${key}`, interpolationOptions)
  }

  locale () {
    let lang = arguments[0]
    if (lang) {
      polyglot.locale(lang)
    } else {
      return polyglot.locale()
    }
  }
}

export default new I18n()
