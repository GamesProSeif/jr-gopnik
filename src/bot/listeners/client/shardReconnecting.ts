import { Listener } from 'discord-akairo';
import { EVENTS, TOPICS } from '../../util/logger';

export default class ShardReconnectingListener extends Listener {
	constructor() {
		super('shardReconnecting', {
			emitter: 'client',
			event: 'shardReconnecting',
			category: 'client'
		});
	}

	public exec() {
		this.client.logger.info('Attempting to reconnect', { topic: TOPICS.DISCORD, event: EVENTS.SHARD_RECONNECTING });
	}
}
