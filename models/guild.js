const { Schema, model } = require('mongoose');

const GuildSchema = new Schema({
  guild_id: {
    type: String,
    required: true,
    unique: true
  },
  settings: {
    type: Map,
    prefix: {
      type: String,
      default: '/'
    },
    user_role: String,
    bot_role: String,
    auto_assign_roles: {
      type: Boolean,
      default: false
    },
    member_logs_channel: String,
    member_logging: {
      type: Boolean,
      default: false
    },
    snipe: {
      type: Boolean,
      default: true
    }
  },
  member_add_text: {
    type: Array,
    default: undefined
  },
  member_leave_text: {
    type: Array,
    default: undefined
  }
});

const GuildModel = model('guilds', GuildSchema);

module.exports = GuildModel;
