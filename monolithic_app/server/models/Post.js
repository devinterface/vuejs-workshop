import {Sequelize} from 'sequelize'
import sequelize from '../common/sequelize'

const Post = sequelize.define('posts', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
},
  {
    indexes: [{fields: ['userId']}]
  }
)

export default Post
