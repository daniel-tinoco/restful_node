const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/bookAPI')
const bookRouter = express.Router()
const port = process.env.PORT || 3000
const Book = require('./models/bookModel')

bookRouter.route('/books').get((req, res) => {
  const query = {}
  if (req.query.genre) query.genre = req.query.genre
  Book.find(query, (err, books) => {
    if (err) return res.status(500).send(err)
    return res.json(books)
  })
})

bookRouter.route('/books/:bookId').get((req, res) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) return res.status(500).send(err)
    return res.send(book)
  })
})

app.use('/api', bookRouter)

app.get('/', (req, res) => {
  res.send('WORKS IT API!')
})

app.listen(port, () => {
  console.log('Running in the port ' + port)
})
