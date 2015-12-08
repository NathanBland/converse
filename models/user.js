var mongoose = require('mongoose')

var User = mongoose.Schema({
  /* email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }, */
  username: {
    type: String,
    required: true
  }
})
User.plugin(require('passport-local-mongoose'), {
  usernameLowerCase: true
})

module.exports = mongoose.model('user', User)
