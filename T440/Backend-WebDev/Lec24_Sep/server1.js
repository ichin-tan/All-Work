const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/help', function (req, res) {
    res.send('You hAVE REACHED THE HELP PAGE')
})

app.listen(3000)