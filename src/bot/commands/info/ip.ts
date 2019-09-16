import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

export default class IpCommand extends Command {
	constructor() {
		super('ip', {
			aliases: ['ip', 'ip-info', 'get-ip'],
			args: [
				{
					id: 'ip',
					prompt: {
						retry: `That's not a valid IP! Try again.`,
						start: `What's the IP you want info about?`
					},
					type: /((?:^\s*(?:(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(?:^\s*(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}(?:[0-9A-Fa-f]{1,4}|:))|(?:(?:[0-9A-Fa-f]{1,4}:){6}(?::[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9A-Fa-f]{1,4}:){5}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9A-Fa-f]{1,4}:){4}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,3})|(?:(?::[0-9A-Fa-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9A-Fa-f]{1,4}:){3}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,4})|(?:(?::[0-9A-Fa-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9A-Fa-f]{1,4}:){2}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,5})|(?:(?::[0-9A-Fa-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9A-Fa-f]{1,4}:){1}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,6})|(?:(?::[0-9A-Fa-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9A-Fa-f]{1,4}){1,7})|(?:(?::[0-9A-Fa-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$))/
				}
			],
			category: 'info',
			cooldown: 30000,
			description: {
				content: 'Gets information about an IP address',
				usage: '<IPv4/IPv6>',
				examples: ['123.123.123.123', '2001:0db8:85a3:0000:0000:8a2e:0370:7334']
			}
		});
	}

	public async exec(message: Message, args: any) {
		const sent = (await message.util!.send(
			'Getting IP information...'
		)) as Message;
		const ip: string = args.ip.match[args.ip.match.index];
		const url = process.env.IPINFO_API_KEY! + ip;
		const response = await fetch(url);
		const json = await response.json();

		const embed = new MessageEmbed()
			.setColor(this.client.config.colors!.info)
			.setTitle(`Information about IP ${json.ipAddress}`)
			.setDescription(
				stripIndents`
        • Country Code: ${json.countryCode}
        • Country Name: ${json.countryName}
        • Region Name: ${json.regionName}
        • Zip Code: ${json.zipCode}
        • Latitude: ${json.latitude}
        • Longitude: ${json.longitude}
        • Time Zone: ${json.timeZone}
        `
			);

		return sent.edit({
			content: null,
			embed
		});
	}
}
