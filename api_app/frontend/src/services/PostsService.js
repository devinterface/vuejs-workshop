import axios from '../axios'

class PostsService {
  static async index () {
    let response = await axios.GET('posts')
    return response.data
  }

  static async show (id) {
    let response = await axios.GET(`posts/${id}`)
    return response.data
  }

  static async create (postData) {
    try {
      let response = await axios.POST('posts', postData)
      return { post: response.data }
    } catch (error) {
      return { errors: error.response.data }
    }
  }

  static async update (id, postData) {
    try {
      let response = await axios.PUT(`posts/${id}`, postData)
      return { post: response.data }
    } catch (error) {
      return { errors: error.response.data }
    }
  }

  static async destroy (id) {
    try {
      await axios.DELETE(`posts/${id}`)
      return true
    } catch (error) {
      return { errors: error.response.data }
    }
  }
}

export default PostsService
