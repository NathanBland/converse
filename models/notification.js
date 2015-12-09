var mongoose = require('mongoose')

var Notification = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: String,
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
