const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
// mongodb://<dbuser>:<dbpassword>@ds147072.mlab.com:47072/node-todos
mongoose.connect(uri)



module.exports = { mongoose };
