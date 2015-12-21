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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    unique: true
  }],
  resetToken: String,
  resetExpires: Date
})
User.methods.confirmFriend = function (person, callback) {
  var user = this
  if (user._id == person) {
    console.log('[user.js] User tried to add themself as a friend!')
    return callback('self', null)
  }
  var getuser = this.model('user').findOne({_id: person})
  getuser.exec(function (err, foundUser) {
    if (err) {
      throw err
    }

    console.log('[user.js](confirmFriend) foundUser:', foundUser)
    var checkRequestExists = Notification.findOne({user_email: user.email,
      type: 'request', 'content.created_by': foundUser._id})
    checkRequestExists.exec(function (err, request) {
      if (err) {
        throw err
      }
      if (request) {
        request.set({
          viewed: true
        })
        console.log('[user.js](confirmFriend) person:', person)
        user.friends.push(person)
        user.save(function (err) {
          if (err) {
            return err
          }
          console.log('[user.js](confirmFriend) this user._id:', user._id)
          foundUser.friends.push(user._id)
          foundUser.save(function (err) {
            if (err) {
              return err
            }
            request.save(function (err) {
              if (err) {
                return err
              }
              return callback(null, foundUser)
            })
          })
        })
      } else {
        return callback('No request existed', null)
      }
    })
  })
}
User.methods.addFriend = function (email, callback) {
  var user = this
  if (user.email === email) {
    console.log('[user.js] User tried to add themself as a friend!')
    return callback('self', null)
  }
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
  return this.model('user').populate(this, {
    path: 'friends'
  }, callback)
}

User.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  usernameQueryFields: ['email']
})
module.exports = mongoose.model('user', User)
