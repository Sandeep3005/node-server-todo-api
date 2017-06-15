const { ObjectID } = require('mongodb');
const { Users } = require('./../server/models/user');
const { mongoose } = require('./../server/db/mongoose');

let id = "594236355357a91cc015b033";

if (!ObjectID.isValid(id)) {
  return console.log('Invalid ID provided');
}

Users.findById(id).then((user) => {
  if (!user) {
    return console.log('User with this ID does not exist');
  }
  console.log('User Info', user);
}).catch((e) => {
  console.log(e);
})
