let express = require('express')
let fs = require('fs')

let app = express()

app.use(express.urlencoded({ extended: true }))

app.post('/message-add', function(req, res) {
  let message = req.body.message + "\n"

  fs.appendFile('messages.txt', message, function(err) {
    if(err) {
      res.status(500).send()
    } else {
      res.status(200).send()
    }
  })
})

app.get('/message-get', function(req, res) {
  fs.readFile('messages.txt', function(err, data) {
    if(err) {
      res.status(500).send()
    } else {
      res.send(data.toString())
    }
  })
})

app.listen(7777)