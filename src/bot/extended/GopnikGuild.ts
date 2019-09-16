import { Client, Structures } from 'discord.js';
import { GuildModel } from '../../models/guild';

export default async () => {
	const guilds = await GuildModel.find({});

	return Structures.extend('Guild', Guild => {
		class GopnikGuild extends Guild {
			constructor(client: Client, data: any) {
				super(client, data);
				const guild = guilds.find(g => g.id === this.id);
				this.settings = guild ? guild.settings : null;

				if (!this.settings) {
					this.initGuildDB();
				}
			}

			public async initGuildDB() {
				const guild = new GuildModel({ id: this.id });
				await guild.save();
				this.settings = guild.settings;
				return guild;
			}

			public async editSettings(data: any) {
				try {
					const guild = await GuildModel.findOne({ id: this.id });
					data.prefix = data.prefix || this.settings!.prefix;
					data.user_role = data.user_role || this.settings!.user_role;
					data.bot_role = data.bot_role || this.settings!.bot_role;
					data.auto_assign_roles =
            data.auto_assign_roles || this.settings!.auto_assign_roles;
					data.member_logs_channel =
            data.member_logs_channel || this.settings!.member_logs_channel;
					data.logging = data.logging || this.settings!.logging;

					guild!.settings = data;

					await guild!.save();
					this.settings = data;

					return;
				} catch (err) {
					return err;
				}
			}
		}
		return GopnikGuild;
	});
};
