var mongoose = require('mongoose')

var Notification = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: String

})

module.exports = mongoose.model('notification', Notification)
