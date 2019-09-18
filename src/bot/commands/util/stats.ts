import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import * as moment from 'moment';
import fetch from 'node-fetch';
import pack from '../../../../package.json';

export default class StatsCommand extends Command {
	constructor() {
		super('stats', {
			aliases: ['stats', 'statistics'],
			description: {
				content: 'Displays the stats of the bot'
			},
			category: 'util'
		});
	}

	public async exec(message: Message) {
		const { commit, html_url: commitURL } = (await (await fetch(
			'https://api.github.com/repos/gamesproseif/jr-gopnik/commits'
		)).json())[0];

		const uptime = (moment.duration(
			this.client.uptime!
		) as unknown) as moment.Moment;

		let guildSize;
		let channelSize;
		let userSize;

		if (this.client.config.sharding) {
			const guildSizeResults: number[] = await this.client.shard!.fetchClientValues(
				'guilds.size'
			);
			const channelSizeResults: number[] = await this.client.shard!.fetchClientValues(
				'channels.size'
			);
			const userSizeResults: number[] = await this.client.shard!.broadcastEval(
				'this.guilds.reduce((a, b) => a + b.memberCount, 0);'
			);
			guildSize = guildSizeResults.reduce((a, b) => a + b);
			channelSize = channelSizeResults.reduce((a, b) => a + b);
			userSize = userSizeResults.reduce((a, b) => a + b);
		} else {
			guildSize = this.client.guilds.size;
			channelSize = this.client.channels.size;
			userSize = this.client.guilds.reduce((a, b) => a + b.memberCount, 0);
		}

		const embed = new MessageEmbed()
			.setColor(this.client.config.colors!.info)
			.setThumbnail(this.client.user!.displayAvatarURL())
			.setDescription(`**${this.client.user!.username} Statistics**`)
			.addField(
				'❯ General Statistics',
				`• Guilds: ${guildSize}\n• Channels: ${channelSize}\n• Users: ${userSize}`,
				false
			)
			.addField('❯ Version', `• Bot: ${pack.version}`, true)
			.addField(
				'❯ Memory Usage',
				`• Bot: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
				true
			)
			.addField(
				'❯ Source Code',
				`[View Here](https://github.com/GamesProSeif/jr-gopnik/ "GamesProSeif/jr-gopnik")`,
				true
			)
			.addField(
				'❯ Library',
				`[discord.js](https://discord.js.org/) - [akairo](https://discord-akairo.github.io/)`,
				true
			)
			.addField('❯ Uptime', uptime.format('d[d ]h[h ]m[m ]s[s]'), true);
		let lastUpdate = `[${commit.message}](${commitURL})`;
		if (commit.message.length > 20) {
			const shortened = `${commit.message.slice(0, 20)}...`;
			lastUpdate = `[${shortened}](${commitURL} "${commit.message}")`;
		}
		embed
			.addField('❯ Last Update', lastUpdate, true)
			.setFooter(`© ${moment().format('YYYY')} Jr. Gopnik`);

		return message.util!.send(embed);
	}
}
