import { readdir, readFile } from 'fs';
import { Argument, Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { join } from 'path';
import { promisify } from 'util';

const promReadfile = promisify(readFile);
const promReaddir = promisify(readdir);

export default class ViewLogsCommand extends Command {
	constructor() {
		super('view-logs', {
			aliases: ['view-logs', 'vl'],
			category: 'util',
			ownerOnly: true,
			description: {
				content: 'Displays logs'
			}
		});
	}

	public async *args() {
		const logfiles = (await promReaddir(process.cwd()))
			.filter(f => f.startsWith('jrgopnik') && f.endsWith('.log'))
			.sort()
			.reverse();

		console.log(logfiles);

		if (logfiles.length === 1) return { filename: logfiles[0] };

		const index: number = yield {
			'type': Argument.range('integer', 0, logfiles.length),
			'prompt': {
				start: `Choose an file (0-${logfiles.length})`,
				retry: `Invalid index (0-${logfiles.length})`,
				optional: true
			},
			'default': 0
		};

		return { filename: logfiles[index] };
	}

	public async exec(message: Message, { filename }: { filename: string}) {
		const logs = await promReadfile(join(process.cwd(), filename));

		await message.author!.send({
			files: [{ attachment: logs, name: filename }]
		});

		return message.util!.send('✅ Sent logs in DM');
	}
}
