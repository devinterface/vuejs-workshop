const dotenv = require('dotenv')
dotenv.config()
module.exports =
{
  development: {
    database: process.env.DB_NAME,
    dialect: 'sqlite',
    storage: 'sqlitedb'
  }
}
