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
  },
  notification_count: {
    type: Number,
    default: 0
  }
})
User.plugin(require('passport-local-mongoose'), {
  usernameField: 'email',
  usernameLowerCase: true,
  usernameQueryFields: ['email']
})

module.exports = mongoose.model('user', User)
