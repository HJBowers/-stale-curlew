const databaseName = 'Staleness'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const db = pgp(connectionString)

const insertPost = 'INSERT INTO posts (title, written_at, body) VALUES ($1, now(), $2) RETURNING id'
const selectPostById = 'SELECT * FROM posts WHERE id=$1'

const Post = {
  insert: ({title, body}) => db.oneOrNone(insertPost, [title, body]),
  select: (post_id) => db.oneOrNone(selectPostById, [post_id])
}

const insertComment = 'INSERT INTO comments (posts_id, user_name, body, written_at) VALUES ($1, $2, $3, now()) RETURNING *'
const selectCommentByPostId = 'SELECT * FROM comments WHERE posts_id=$1'

const Comment = {
  insert: ({posts_id, user_name, body}) =>
    db.oneOrNone(insertComment, [parseInt(posts_id), user_name, body]),
  select: post_id => db.any(selectCommentByPostId, [post_id])
}

module.exports = {Post, Comment}
