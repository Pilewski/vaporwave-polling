var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const md5 = require('md5');
const environment = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.polls = [];
app.locals.index = 0;

const createNewPoll = (pollData) => {
  const pollInfo = {
    ext: app.locals.index,
    data: pollData
  }
  app.locals.polls.push(pollInfo)
  app.locals.index++
  return app.locals.index - 1
}

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'src', 'index.html'));
});

app.post('/poll', (req, res) => {
  let id = createNewPoll(req.body)
  res.send({ id })
})

app.use(express.static(path.resolve(__dirname, '..', 'src')));

app.get(`/poll/*`, (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'src', 'poll.html'));
})

var port_number = process.env.PORT || 3001

app.listen(port_number, function () {
  console.log('Server running on port 3001')
});

module.exports = app;
