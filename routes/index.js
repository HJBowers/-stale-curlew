const express = require('express')
const router = express.Router()
const {Post, Comment} = require('../database')

router.get('/home', (request, response) => response.render('index'))

//=============================================================================>
router.post('/insert_post', (request, response) =>
  Post.insert(request.body).then(post => response.redirect(`/post_details/${post.id}`))
)

//=============================================================================>
router.get('/post_details/:current_post_id', (request, response) => {
  const {current_post_id} = request.params

  Promise.all([Post.select(current_post_id), Comment.select(current_post_id)])
    .then(results => {
      const [returnedPost, comments] = results

      response.render('detail', {returnedPost, comments})
    })
})

//=============================================================================>
router.post('/insert_comment', (request, response) =>
  Comment.insert(request.body)
    .then(comment => response.redirect(`/post_details/${comment.posts_id}`))
)

module.exports = router
