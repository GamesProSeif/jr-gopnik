import { Listener } from 'discord-akairo';
import { TOPICS } from '../../util/constants';

export default class UnhandledRejectionListener extends Listener {
	constructor() {
		super('unhandledRejection', {
			emitter: 'process',
			event: 'unhandledRejection'
		});
	}

	public exec(error: any) {
		this.client.logger.error(error, { topic: TOPICS.UNHANDLED_REJECTION });
	}
}
