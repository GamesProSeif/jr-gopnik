const { Schema, model } = require('mongoose');

const MemberSchema = new Schema({
  user: String,
  guild: String,
  roles: {
    type: Array,
    default: []
  },
  xp: {
    type: Number,
    default: 0
  },
  presence: String
});

const MemberModel = model('members', MemberSchema);

module.exports = MemberModel;
