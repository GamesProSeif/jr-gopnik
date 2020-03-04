import { Listener } from 'discord-akairo';
import { EVENTS, TOPICS } from '../../util/constants';

export default class ShardResumedListener extends Listener {
	constructor() {
		super('shardResumed', {
			emitter: 'client',
			event: 'shardResumed',
			category: 'client'
		});
	}

	public exec() {
		this.client.logger.info('Connected successfully', { topic: TOPICS.DISCORD, event: EVENTS.SHARD_RESUMED });
		this.client.ready = true;
	}
}
