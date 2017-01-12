const express = require('express')
const router = express.Router()
const {Post, Comment} = require('../database')

//=============================================================================>
router.get('/home', (request, response) => response.render('index', {returnedAllPosts: [], }))

//=============================================================================>
router.post('/insert_post', (request, response) =>
  Post.insert(request.body).then(post => response.redirect(`/post_details/${post.id}`))
)

//=============================================================================>
router.get('/all_posts', (request, response) => {
  const {current_id} = request.params
  Select.all(Post.selectAll())
    .then(results => {
      response.render('index', {returnedAllPosts: results})
    })
})

//=============================================================================>
router.get('/post_details/:current_post_id', (request, response) => {
  Promise.all([Post.select(request.params.current_post_id), Comment.select(request.params.current_post_id)])
    .then(results => {
      response.render('detail', {returnedPost: results, comments:results})
    })
})

//=============================================================================>
router.get('/hello/:foo', (request, response) => {
  response.json({message: 'Hello ' + request.params.foo + '!'})
})

//=============================================================================>
router.post('/insert_comment', (request, response) =>
  Comment.insert(request.body)
    .then(comment => response.redirect(`/post_details/${comment.posts_id}`))
)

module.exports = router


// ORIGINAL CODE
// router.get('/post_details/:current_post_id', (request, response) => {
//   const {current_post_id} = request.params
//   Promise.all([Post.select(current_post_id), Comment.select(current_post_id)])
//     .then(results => {
//       const [returnedPost, comments] = results
//       response.render('detail', {returnedPost, comments})
//     })
// })
