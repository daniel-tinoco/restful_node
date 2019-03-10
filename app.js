const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/bookAPI')
const port = process.env.PORT || 3000
const Book = require('./models/bookModel')
const bookRouter = require('./routes/bookRouter')(Book)

app.use('/api', bookRouter)

app.get('/', (req, res) => {
  res.send('WORKS IT API!')
})

app.listen(port, () => {
  console.log('Running in the port ' + port)
})
