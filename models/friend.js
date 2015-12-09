var mongoose = require('mongoose')

var Friend = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  added: Boolean
})

module.exports = mongoose.model('friend', Friend)
