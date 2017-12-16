
import i18n from './i18n'

const url = (reqOrLang, urlToGo) => {
  if (typeof (reqOrLang) === 'string') {
    return `/${reqOrLang}${urlToGo}`
  } else {
    return `/${i18n.locale()}${urlToGo}`
  }
}

export default url
