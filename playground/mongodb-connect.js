//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
  if(err) {
    return console.log('Unable to connect to database')
  }

  console.log('Connected to Mongo');

  // let todo = {
  //   text: 'Watch a TV Show',
  //   isCompleted: false
  // }
  //
  // db.collection('Todos').insertOne(todo, (err, result)=>{
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  let user = {
    name: 'John Cusack',
    age: 25,
    location: 'New Jersey'
  };

  db.collection('Users').insertOne(user, (err, result)=>{
    if (err) {
      return console.log('Unable to insert user', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
})
