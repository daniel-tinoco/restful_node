const express = require('express')

const routes = (Book) => {
  const bookRouter = express.Router()
  bookRouter.route('/books')
    .get((req, res) => {
      const query = {}
      if (req.query.genre) query.genre = req.query.genre
      Book.find(query, (err, books) => {
        if (err) return res.status(500).send(err)
        return res.json(books)
      })
    })
    .post((req, res) => {
      const book = new Book(req.body)
      book.save()
      return res.status(201).json(book)
    })

  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) return res.status(500).send(err)
      if (book) {
        req.book = book
        return next()
      }
      return res.sendStatus(404)
    })
  })
  bookRouter.route('/books/:bookId')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req
      book.title = req.body.title
      book.author = req.body.author
      book.genre = req.body.genre
      book.read = req.body.read
      book.save()
      return res.status(200).json(book)
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) return res.status(500).send(err)
        return res.sendStatus(404)
      })
    })

  return bookRouter
}

module.exports = routes
