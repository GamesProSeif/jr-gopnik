import { ShardingManager } from 'discord.js';
import './util/env';
import { SHARDING } from './util/constants';
import 'moment-duration-format';

// tslint:disable-next-line: no-var-requires
// require('moment-duration-format');

const runBot = async () => {
	if (!SHARDING) {
		return require('./bot.js');
	}
	const manager = new ShardingManager('./bot/bot.js');

	manager.spawn();
	manager.on('shardCreate', shard => {
		console.log(`Launched shard ${shard.id}`);
	});
};

runBot();
