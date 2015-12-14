var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')
var Notification = require('./notification')
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
  },
  resetToken: String,
  resetExpires: Date
})

User.methods.addFriend = function (email, callback) {
  var query = Friends.find({
    email: email
  })
  var getUser = this.db.model('User').find({
    email: email
  })
  query.where('added').equals(true).sort('-id').exec(function (err, frinedReq) {
    if (err) {
      throw err
    }
    if (frinedReq.length < 1) {
      console.log('[user.js] No existing friend request')
      getUser.exec(function (err, friend) {
        if (err) {
          throw err
        }
        return Notification.create({
          user_id: friend._id,
          type: 'request',
          title: 'New Friend Request',
          content: {
            created_by: this._id,
            message: this.displayName + ' added you as a friend!'
          }
        }, callback)
      })
    } else {
      console.log('[user.js] Friend request already exists:', frinedReq)
      return callback
    }
  })
}

User.methods.findNotifications = function (callback) {
  var query = Notification.find({
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

User.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  usernameQueryFields: ['email']
})
module.exports = mongoose.model('user', User)
