const databaseName = 'Staleness'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const db = pgp(connectionString)


const insertPost = 'INSERT INTO posts (title, written_at, body) VALUES ($1, now(), $2) RETURNING *'

const Post = {
  insert: ({title, body}) => db.oneOrNone(insertPost, [title, body])
}

// const = Comment = {
//   method: () => {}
// }

module.exports = {Post}
