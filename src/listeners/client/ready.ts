import { Listener } from 'discord-akairo';
import { EVENTS, TOPICS, DEVELOPMENT, PREFIX } from '../../util/constants';

const clientPrefix =
	DEVELOPMENT ? PREFIX.replace(/.$/, '@') : PREFIX;

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
