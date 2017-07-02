const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let remoteURI = 'mongodb://sandeep3005:todosapi@ds147072.mlab.com:47072/node-todos
'
let uri = remoteURI;//process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
// mongodb://<dbuser>:<dbpassword>@ds147072.mlab.com:47072/node-todos
mongoose.connect(uri)



module.exports = { mongoose };
