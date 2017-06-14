const bodyParser = require('body-parser');
const express = require('express');

const { mongoose } = require('./db/mongoose');
const { Todos } = require('./models/todo');
const { Users } = require('./models/user');

let app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
  let newTodo = new Todos({
    text: req.body.text
  })

  newTodo.save().then((doc)=>{
    res.status(200).send(doc);
  }, (err)=>{
    res.status(400).send(err);
  })
});

app.listen(8080, ()=>{
  console.log('App is up and running on port 8080');
})

module.exports = { app }
