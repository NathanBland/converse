var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')
var Notification = require('./notification')

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
  friends: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    }}],
  resetToken: String,
  resetExpires: Date
})

User.methods.addFriend = function (email, callback) {
  var user = this
  var getUser = this.model('user').findOne()
    .where('email').equals(email)
    .select('_id email displayName')
  getUser.exec(function (err, foundUser) {
    if (err) {
      throw err
    }
    console.log('[user.js] From user:', user)
    console.log('[user.js] User found:', foundUser)
    console.log('[user.js] Checking for existing friend request')
    var checkNotifications = Notification.find({user_email: email,
      type: 'request', 'content.created_by': user._id})
    checkNotifications
    .exec(function (err, friendReq) {
      if (err) {
        return err
      }
      console.log('[user.js] results:', friendReq)
      if (friendReq.length < 1) {
        console.log('[user.js] No existing friend request')
        console.log('[user.js] creaing notification for user:', foundUser)
        var notif = new Notification({
          user_email: email,
          type: 'request',
          title: 'New Friend Request',
          content: {
            created_by: user._id,
            message: user.displayName + ' added you as a friend!'
          }
        })
        console.log('[user.js] notification created:', notif)
        return notif.save(callback)
      } else {
        console.log('[user.js] Friend request already exists:', friendReq)
        return callback(null, friendReq)
      }
    })
  })
}

User.methods.findNotifications = function (callback) {
  var query = Notification.find({
    user_email: this.email
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
