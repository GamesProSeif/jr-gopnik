import { ShardingManager } from 'discord.js';
import { config } from 'dotenv';
import * as mongoose from 'mongoose';
import * as clientConfig from '../config.json';

// tslint:disable-next-line: no-var-requires
require('moment-duration-format');

config({ path: './.env' });

const runBot = async () => {
	if (!clientConfig.sharding) {
		return require('./bot/bot.js');
	}
	const manager = new ShardingManager('./bot/bot.js');

	manager.spawn();
	manager.on('shardCreate', shard => {
		console.log(`Launched shard ${shard.id}`);
	});
};


mongoose.connect(process.env.DB_URI!, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to MongoDB');
	runBot();
});

db.on('error', console.error);
