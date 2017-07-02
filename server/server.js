const bodyParser = require('body-parser');
const express = require('express');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todos } = require('./models/todo');
const { Users } = require('./models/user');

let port  = process.env.PORT || 8080;
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

app.get('/todos', (req, res)=>{
    Todos.find().then((docs)=>{
      res.send({ docs })
    }).catch((e) => {
      res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res)=> {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todos.findById(id).then((doc) => {
      if (!doc) {
        return res.status(404).send();
      }
      return res.send({ doc });
    }).catch((e) => {
      res.status(400).send();
    })
});

app.delete('/todos/:id', (req, res)=>{
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todos.findByIdAndRemove(id).then((doc) => {
    if (!doc) return res.status(404).send();
    return res.status(200).send({ doc });
  }).catch((e) =>{
    res.status(400).send();
  })
});

app.listen(port, ()=>{
  console.log(`App is up and running on port ${port}`);
})

module.exports = { app }
