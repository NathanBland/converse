var mongoose = require('mongoose')
var Notifications = require('./notification')
var Friends = require('./friend')

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
User.methods.addFriend = function (email, callback) {
  var query = Friends.find({
    email: email
  })
  if (callback) {
    return query.where('added').equals(true).sort('-id').exec(callback)
  } else {
    return query
  }
}

User.methods.findNotifications = function (callback) {
  var query = Notifications.find({
    user_id: this._id
  })
  if (callback) {
    return query.where('viewed').equals(false).sort('-created').exec(callback)
  } else {
    return query
  }
}

User.methods.findFriends = function (callback) {
  var query = Friends.find({
    user_id: this._id
  })
  if (callback) {
    return query.where('added').equals(true).sort('-id').exec(callback)
  } else {
    return query
  }
}

User.plugin(require('passport-local-mongoose'), {
  usernameField: 'email',
  usernameLowerCase: true,
  usernameQueryFields: ['email']
})

module.exports = mongoose.model('user', User)
