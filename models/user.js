var mongoose = require('mongoose')

var User = mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  username: {
    type: String,
    required: false
  },
  displayName: {
    type: String,
    required: false
  }
})
User.plugin(require('passport-local-mongoose'), {
  usernameField: 'email',
  usernameLowerCase: true,
  usernameQueryFields: ['email']
})

module.exports = mongoose.model('user', User)
