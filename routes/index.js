const express = require('express')
const router = express.Router()
const {Post, Comment} = require('../database')

router.get('/home', (request, response) => response.render('index', {returnedAllPosts: [], }))

//=============================================================================>
router.post('/insert_post', (request, response) =>
  Post.insert(request.body).then(post => response.redirect(`/post_details/${post.id}`))
)

//=============================================================================>
router.post('/all_posts', (request, response) => {
  const {current_id} = request.params

  Select.all(Post.selectAll())
    .then(results => {
      response.render('index', {returnedAllPosts: results})
    })
})

//=============================================================================>
// localhost:3000/post_details/200
router.get('/post_details/:current_post_id', (request, response) => {
  request.params.current_post_id = 200
  const {current_post_id} = request.params

  Promise.all([Post.select(current_post_id), Comment.select(current_post_id)])
    .then(results => {
      const [returnedPost, comments] = results

      response.render('detail', {returnedPost, comments})
    })
})

router.get('/hello/:foo', (request, response) => {
  response.json({message: 'Hello ' + request.params.foo + '!'})
})

//=============================================================================>
router.post('/insert_comment', (request, response) =>
  Comment.insert(request.body)
    .then(comment => response.redirect(`/post_details/${comment.posts_id}`))
)

module.exports = router
