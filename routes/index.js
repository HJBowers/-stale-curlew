const express = require('express')
const router = express.Router()
const {Post} = require('../database')


router.get('/home', (request, response) => response.render('index'))

router.post('/insert', (request, response) =>
  Post.insert(request.body).then(post => response.json({post}))
)

module.exports = router
