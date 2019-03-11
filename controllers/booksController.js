const bookController = (Book) => {
  const index = (req, res) => {
    const query = {}
    if (req.query.genre) query.genre = req.query.genre
    Book.find(query, (err, books) => {
      if (err) return res.status(500).send(err)
      return res.json(books)
    })
  }

  const store = (req, res) => {
    const book = new Book(req.body)
    book.save()
    return res.status(201).json(book)
  }

  return { index, store }
}

module.exports = bookController
