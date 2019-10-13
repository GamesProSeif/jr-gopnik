import { Listener } from 'discord-akairo';
import { CloseEvent } from 'ws';
import { EVENTS, TOPICS } from '../../util/logger';

export default class ShardDisconnectedListener extends Listener {
	constructor() {
		super('shardDisconnected', {
			emitter: 'client',
			event: 'shardDisconnected',
			category: 'client'
		});
	}

	public exec(event: CloseEvent) {
		this.client.logger.info(`Disconnected from websocket (Status: ${event.code})`, {
			topic: TOPICS.DISCORD,
			event: EVENTS.SHARD_DISCONNECTED
		});
		this.client.ready = false;
	}
}
