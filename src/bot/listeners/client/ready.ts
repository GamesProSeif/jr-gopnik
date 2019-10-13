import { Listener } from 'discord-akairo';
import { prefix } from '../../../../config.json';
import { EVENTS, TOPICS } from '../../util/logger';

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
		this.client.logger.info(`${this.client.user!.username} launched...`, {
			topic: TOPICS.DISCORD,
			event: EVENTS.READY
		});
	}
}
