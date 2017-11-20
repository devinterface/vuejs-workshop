import axios from 'axios'
import store from './store'
import router from './router'
import _ from 'lodash'

const rootApiUrl = 'http://localhost:3000/api/v1/'

let axiosInstance = axios.create({
  baseURL: rootApiUrl
})

let unsafeAxiosInstance = axios.create({
  baseURL: rootApiUrl
})

const getAxiosConfig = (customConfig) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${store.getStateData('jwtAuthToken')}`
    }
  }
  if (customConfig) _.merge(config, customConfig)
  return config
}

const axiosInstanceErrorHandler = (error) => {
  if ([200, 422].indexOf(error.response.status) !== -1) {
    return
  }
  switch (error.response.status) {
    case 404:
      console.log('not_found')
      break
    case 401:
      console.log('unauthorized')
      break
    case 403:
      console.log('forbidden')
      break
    case 500:
      console.log('internal_server_error')
      break
    default:
      console.log('unknown_error')
  }
  router.push({ name: 'Home' })
}

axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  if (error.response) {
    axiosInstanceErrorHandler(error)
  } else if (error.request) {
   // The request was made but no response was received
   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
   // http.ClientRequest in node.js
    console.log(error.request)
  } else {
   // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  return Promise.reject(error)
})

unsafeAxiosInstance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response) {
    return error.response
  } else if (error.request) {
    return error.request
  } else {
    return error.message
  }
})

class Axios {
  static GET (url, body, config) {
    return axiosInstance.get(url, _.assign(getAxiosConfig(config), { params: body }))
  }

  static POST (url, body, config) {
    return axiosInstance.post(url, body, getAxiosConfig(config))
  }

  static PUT (url, body, config) {
    return axiosInstance.put(url, body, getAxiosConfig(config))
  }

  static DELETE (url, body, config) {
    return axiosInstance.delete(url, _.assign(getAxiosConfig(config), { params: body }))
  }

  // to use axios without interceptors
  static unsafeGET (url, body, config) {
    return unsafeAxiosInstance.get(url, _.assign(getAxiosConfig(config), { params: body }))
  }

  static unsafePOST (url, body, config) {
    return unsafeAxiosInstance.post(url, body, getAxiosConfig(config))
  }

  static unsafePUT (url, body, config) {
    return unsafeAxiosInstance.put(url, body, getAxiosConfig(config))
  }

  static unsafeDELETE (url, body, config) {
    return unsafeAxiosInstance.delete(url, _.assign(getAxiosConfig(config), { params: body }))
  }
}

export default Axios
