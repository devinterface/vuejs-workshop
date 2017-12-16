import { Post } from '../models'

class PostsService {
  async all () {
    let posts = await Post.findAll({})
    return posts
  }

  async byId (id) {
    let post = await Post.findById(id)
    return post
  }

  async bySlug (slug) {
    let post = await Post.findBySlug(slug)
    return post
  }

  async build (data) {
    let post = await Post.build(data)
    return post
  }
  async create (data) {
    let post = await Post.build(data)
    await post.save()
    return post
  }

  async delete (id) {
    let post = await Post.findById(id)
    await post.destroy()
    return post
  }

  async update (id, data) {
    let post = await Post.findById(id)
    Object.assign(post, data)
    await post.save()
    return post
  }
}

export default new PostsService()
