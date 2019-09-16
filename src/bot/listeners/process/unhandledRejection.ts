import { Listener } from 'discord-akairo';

export default class UnhandledRejectionListener extends Listener {
	constructor() {
		super('unhandledRejection', {
			emitter: 'process',
			event: 'unhandledRejection'
		});
	}

	public exec(error: Error) {
		console.error(error);
	}
}
