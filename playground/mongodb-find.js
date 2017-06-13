const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err) {
    return console.log('Unable to connect to database')
  }
  console.log('Connected to Mongo');

  // db.collection('Todos').find().toArray().then((docs)=>{
  //   console.log(docs);
  // });

  db.collection('Users').find({name:'Jen Parker'}).count().then((count)=>{
    console.log('Count : ', count);
  });
});
