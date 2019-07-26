const { Schema, model } = require('mongoose');

const defaultSettings = new Map();
defaultSettings.set('prefix', '/');
defaultSettings.set('user_role', null);
defaultSettings.set('bot_role', null);
defaultSettings.set('auto_assign_roles', false);
defaultSettings.set('member_logs_channel', null);
defaultSettings.set('member_logging', false);

const GuildSchema = new Schema({
  guild_id: {
    type: String,
    required: true,
    unique: true
  },
  settings: {
    type: Map,
    default: defaultSettings,
    prefix: {
      type: String,
      default: '/'
    },
    user_role: String,
    bot_role: String,
    auto_assign_roles: Boolean,
    member_logs_channel: String,
    member_logging: Boolean
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
