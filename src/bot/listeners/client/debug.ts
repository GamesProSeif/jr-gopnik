import { Listener } from 'discord-akairo';
import { TOPICS, EVENTS } from '../../util/logger';

export default class ClientErrorListener extends Listener {
	constructor() {
		super('clientDebug', {
			emitter: 'client',
			event: 'debug',
			category: 'client'
		});
	}

	public exec(info: string) {
		this.client.logger.debug(info, {
			topic: TOPICS.DISCORD,
			event: EVENTS.DEBUG
		});
	}
}
