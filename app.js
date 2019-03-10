const express = require('express')

const app = express()
const bookRouter = express.Router()
const port = process.env.PORT || 3000

bookRouter.route('/books')
    .get((req, res)  => {
        const response = { "hello": "Response JSON API" }
        res.json(response)
    });


app.use('/api', bookRouter)

app.get('/', (req, res) =>  {
    res.send('WORKS IT API!')
});


app.listen(port, () => {
    console.log('Running in the port ' + port)
});
