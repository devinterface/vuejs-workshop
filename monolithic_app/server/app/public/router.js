import * as express from 'express'
export default express
  .Router()
  .get('/', (req, res, next) => {
    res.render('index')
  })
  .get('/about', (req, res, next) => {
    res.render('about')
  })
