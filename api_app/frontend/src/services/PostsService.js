import axios from '../axios'

class PostsService {
  static async index () {
    let response = await axios.GET('posts')
    return response.data
  }
}

export default PostsService
