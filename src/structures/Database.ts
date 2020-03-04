import { ConnectionManager } from 'typeorm';
import { Guild } from '../models/guild';
import { Settings } from '../models/settings';
import { Tag } from '../models/tag';
import { DEVELOPMENT } from '../util/constants';

const manager = new ConnectionManager();
const connection = manager.create({
	name: 'jr-gopnik',
	type: 'mongodb',
	url: process.env.DB_URI,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	entities: [Guild, Settings, Tag],
	database: DEVELOPMENT ? 'dev' : 'prod'
});

export default connection;
