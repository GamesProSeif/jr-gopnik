import { Listener } from 'discord-akairo';
import { prefix } from '../../../../config.json';

const clientPrefix =
	process.env.NODE_ENV === 'development' ? prefix.replace(/.$/, '@') : prefix;

export default class Ready extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client'
		});
	}

	public async exec() {
		await this.client.user!.setActivity(`${clientPrefix}help`);
		this.client.ready = true;
		console.log(`${this.client.user!.username} launched...`);
	}
}
