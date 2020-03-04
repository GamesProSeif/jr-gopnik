import { Listener } from 'discord-akairo';
import { TOPICS, EVENTS } from '../../util/constants';

export default class ClientErrorListener extends Listener {
	constructor() {
		super('clientError', {
			emitter: 'client',
			event: 'error',
			category: 'client'
		});
	}

	public exec(error: any) {
		this.client.logger.error(error, {
			topic: TOPICS.DISCORD,
			event: EVENTS.ERROR
		});
	}
}
