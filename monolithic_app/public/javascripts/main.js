import Vue from 'vue/dist/vue.js'
import axios from 'axios/dist/axios.js'
import Toastr from 'toastr'
import _ from 'lodash'

require('moment/min/locales.min')

const formatErrors = (errors) => {
  let msg = '<ul>'
  if (errors === undefined) {
    errors = []
  }
  if (_.isString(errors)) {
    errors = [{msg: errors}]
  }
  errors.forEach((error) => {
    msg += `<li>${error.msg}</li>`
  })
  msg += '</ul>'
  return msg
}

/**
 *  401 -> no login
 *  403 -> sarà libreria per gestione accessi (cancan)
 *  404 -> messaggio risorsa non trovata
 *  500 -> qualcosa di brutto
 *  !(200 v 422) -> tostr di errore sconosciuto
 *
 *  tutto fa redirect a home (contestuale a tipo login?)
 */
const handleError = (error) => {
  switch (error.response.status) {
    case 404:
      Toastr.warning(formatErrors(error.response.data))
      break
    case 401:
      Toastr.error(formatErrors(error.response.data), 'Unauthorized')
      break
    case 403:
      Toastr.error(formatErrors(error.response.data), 'Forbidden')
      break
    case 422:
      Toastr.warning(formatErrors(error.response.data), 'Unprocessable Entity')
      break
    case 500:
      Toastr.error(formatErrors(error.response.data), 'Internal Server Error')
      break
    default:
      Toastr.error(formatErrors(error.response.data), 'Unknown Error')
  }
}

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response) {
    handleError(error)
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log('Error', error.message)
  }
  return Promise.reject(error)
})

window.Vue = Vue
window.axios = axios
window.Toastr = Toastr
window._ = _

// GENERIC COMPONENTS
Vue.component('navigation', require('./components/Navigation.vue'))
Vue.component('slugInput', require('./components/custom_inputs/Slug.vue'))

// PUBLIC COMPONENTS
Vue.component('hompageIndex', require('./components/homepage/Index.vue'))
Vue.component('about', require('./components/About.vue'))

// POSTS COMPONENTS
Vue.component('postIndex', require('./components/posts/Index.vue'))
Vue.component('postNew', require('./components/posts/New.vue'))
Vue.component('postEdit', require('./components/posts/Edit.vue'))
Vue.component('postShow', require('./components/posts/Show.vue'))

Vue.prototype.$globalEventBus = new Vue()

Vue.filter('truncateText', (value, length = 30) => {
  try {
    return value.substring(0, length)
  } catch (e) {
    return value
  }
})

var app = new Vue({
  el: '#app',
  created () {
    this.$globalEventBus.$on('toastrSuccess', (message) => {
      Toastr.success(message)
    })
  }
})
