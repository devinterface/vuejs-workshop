import {Sequelize} from 'sequelize'
import sequelize from '../common/sequelize'

const Comment = sequelize.define('comments', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4
  },
  postId: {
    type: Sequelize.UUID
  },
  userId: {
    type: Sequelize.UUID
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
},
  {
    indexes: [{fields: ['userId']}, {fields: ['postId']}]
  }
)

export default Comment
