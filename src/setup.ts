import fs from 'fs';
import inquirer from 'inquirer';
import { join } from 'path';

const defaultColors = {
	primary: '0x2ecc71',
	secondary: '0x8e44ad',
	info: '0x0891eb',
	warning: '0xf1c40e',
	error: '0xe74c3c'
};

const defaultEmojis = {
	trash: '🗑'
};

const run = async () => {
	// TODO: Add DISCORD_TOKEN, and other database keys with generator questions
	const configObject = await inquirer.prompt([
		{
			name: 'ownerID',
			type: 'input',
			message:
				'What is the owner ID? (for more owners add IDs separated by commas)'
		},
		{
			name: 'prefix',
			type: 'input',
			message: 'What is the default prefix of the bot?'
		},
		{
			name: 'sharding',
			type: 'confirm',
			message:
				'Do you want sharding feature? (for bots in more than 2500 servers)'
		},
		{
			name: 'serverHost',
			type: 'input',
			message: 'What is the link of the server?'
		}
	]);

	if (configObject.ownerID.includes(',')) {
		configObject.ownerID = configObject.ownerID.replace(/\s/g, '').split(',');
	}
	configObject.serverHost = configObject.serverHost.replace(/\/+$/, '');

	console.log(JSON.stringify(configObject, null, 2));

	const { confirm } = await inquirer.prompt([
		{ name: 'confirm', message: 'Does this look good?', type: 'confirm' }
	]);

	if (!confirm) return console.log('Cancelled...');

	// @ts-ignore
	configObject.colors = defaultColors;
	// @ts-ignore
	configObject.emojis = defaultEmojis;

	console.log('Saving data...');

	await fs.writeFileSync(
		join(__dirname, 'config', 'config.json'),
		JSON.stringify(configObject, null, 2)
	);

	console.log('Saved configuration');
};

run();
