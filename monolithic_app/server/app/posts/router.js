import * as express from 'express'
import controller from './controller'
import authentication from '../../middlewares/authentication'

export default express
  .Router()
  .get('/', authentication.ensureAuthenticated, controller.allPosts)
  .get('/new', authentication.ensureAuthenticated, controller.newPost)
  .post('/', authentication.ensureAuthenticated, controller.createPost)
  .get('/:id', authentication.ensureAuthenticated, controller.showPost)
  .get('/:id/edit', authentication.ensureAuthenticated, controller.editPost)
  .post('/:id', authentication.ensureAuthenticated, controller.updatePost)
  .delete('/:id', authentication.ensureAuthenticated, controller.deletePost)
