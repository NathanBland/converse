var mongoose = require('mongoose')

var Notification = mongoose.Schema({
  user_email: {
    type: String,
    required: true,
    index: true
  },
  type: String,
  title: String,
  content: Object,
  created: {
    type: Date,
    default: Date.now
  },
  viewed: {
    type: Boolean,
    default: false
  }

})

module.exports = mongoose.model('notification', Notification)
