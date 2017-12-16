import formatErrors from '../../common/helper'
import PostValidator from '../../validators/postValidator'
import PostsService from '../../services/postsService'
import _ from 'lodash'
class Controller {
  async allPosts (req, res) {
    let posts = await PostsService.all()
    res.render('posts/index', {
      title: 'Posts Index',
      posts: posts
    })
  }

  async newPost (req, res) {
    let post = await PostsService.build({})
    res.render('posts/new', {
      title: 'New Post',
      post: post
    })
  }
  async createPost (req, res) {
    req.body.data.userId = req.user.id
    const errors = await PostValidator.onCreate(req)
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array())
    }
    try {
      let data = _.pick(req.body.data, ['title', 'body', 'slug', 'userId'])
      const post = await PostsService.create(data)
      res.send(JSON.stringify(post))
    } catch (e) {
      return res.status(500).json(formatErrors(e))
    }
  }
  async showPost (req, res) {
    let post = await PostsService.byId(req.params.id)
    res.render('posts/show', {
      title: 'Post Show',
      post: post
    })
  }
  async editPost (req, res) {
    let post = await PostsService.byId(req.params.id)
    res.render('posts/edit', {
      title: 'Edit Post',
      post: post
    })
  }
  async updatePost (req, res) {
    const errors = await PostValidator.onUpdate(req)
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array())
    }
    try {
      let data = _.pick(req.body.data, ['title', 'body'])
      const post = await PostsService.update(req.params.id, data)
      res.send(JSON.stringify(post))
    } catch (e) {
      return res.status(500).json(formatErrors(e))
    }
  }

  async deletePost (req, res) {
    try {
      let post = await PostsService.delete(req.params.id)
      res.send(JSON.stringify(post))
    } catch (e) {
      return res.status(500).json(formatErrors(e))
    }
  }
}
export default new Controller()
