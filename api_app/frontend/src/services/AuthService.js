import axios from '../axios'
import store from '../store'

class AuthService {
  static async signIn (credentials) {
    let response = await axios.unsafePOST('user_token', { auth: credentials }, {})
    if (response.status === 201) {
      store.setStateData('jwtAuthToken', response.data.jwt)
      return true
    } else {
      return null
    }
  }

  static signOut () {
    store.clearStateData('jwtAuthToken')
  }
}

export default AuthService
