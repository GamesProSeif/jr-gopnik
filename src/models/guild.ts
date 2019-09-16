import { model, Schema } from 'mongoose';
import { prefix } from '../../config.json';
import { IGuild, IGuildSettings } from 'typings';

export const defaultSettings: IGuildSettings = {
	prefix,
	user_role: null,
	bot_role: null,
	auto_assign_roles: false,
	member_logs_channel: null,
	logging: false
};

export const SettingsSchema = new Schema(
	{
		prefix: {
			'type': String,
			'default': prefix
		},
		user_role: {
			'type': String,
			'default': null
		},
		bot_role: {
			'type': String,
			'default': null
		},
		auto_assign_roles: {
			'type': Boolean,
			'default': false
		},
		member_logs_channel: {
			'type': String,
			'default': null
		},
		logging: {
			'type': Boolean,
			'default': false
		}
	},
	{ _id: false }
);

export const GuildSchema = new Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	settings: {
		'type': SettingsSchema,
		'default': defaultSettings
	}
});

export const GuildModel = model<IGuild>('guilds', GuildSchema);
