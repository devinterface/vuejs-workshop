'use strict'
import Comment from './Comment'
import Post from './Post'
import User from './User'

Comment.belongsTo(Post)
Comment.belongsTo(User)

Post.belongsTo(User)

User.hasMany(Comment, {
  foreignKey: 'userId'
})
User.hasMany(Post, {
  foreignKey: 'userId'
})

export {
  Comment,
  Post,
  User
}
