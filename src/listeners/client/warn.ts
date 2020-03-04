import { Listener } from 'discord-akairo';
import { EVENTS, TOPICS } from '../../util/constants';

export default class ClientWarnListener extends Listener {
	constructor() {
		super('clientWarn', {
			emitter: 'client',
			event: 'warn',
			category: 'client'
		});
	}

	public exec(warning: string) {
		this.client.logger.warn(warning, { topic: TOPICS.DISCORD, event: EVENTS.WARN });
	}
}
