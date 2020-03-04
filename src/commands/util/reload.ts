import { AkairoModule, Command } from 'discord-akairo';
import { EVENTS, TOPICS } from '../../util/constants';
import { Message } from 'discord.js';

type ModType = 'command' | 'listener' | 'inhibitor';
interface ReloadArgs {
	modType: ModType;
	mod: AkairoModule;
}

export default class ReloadCommand extends Command {
	public constructor() {
		super('reload', {
			aliases: ['reload'],
			category: 'util',
			ownerOnly: true,
			description: {
				content: 'Reloads a module',
				usage: '<type> <module>',
				EXAMPLES: ['command ping', 'listener ready']
			}
		});
	}

	*args() {
		const modType: ModType = yield {
			type: [
				['command', 'c', 'cmd'],
				['listener', 'l'],
				['inhibitor', 'i']
			],
			prompt: {
				start: 'What is the type of the module? [c/l/i]',
				retry: 'Invalid type. Try again! [c/l/i]'
			}
		};

		let mod: AkairoModule;

		if (modType === 'command') {
			mod = yield {
				type: 'commandAlias',
				prompt: {
					start: 'What is the command you want to reload?',
					retry: 'Invalid command. Try again!'
				}
			};
			return { modType, mod };
		} else if (modType === 'listener') {
			mod = yield {
				type: 'listener',
				prompt: {
					start: 'What is the listener you want to reload?',
					retry: 'Invalid listener. Try again!'
				}
			};
			return { modType, mod };
		} else if (modType === 'inhibitor') {
			mod = yield {
				type: 'inhibitor',
				prompt: {
					start: 'What is the inhibitor you want to reload?',
					retry: 'Invalid inhibitor. Try again!'
				}
			};
			return { modType, mod };
		}
	}

	public exec(message: Message, { mod, modType }: ReloadArgs) {
		mod.reload();
		this.client.logger.info(`Reloaded ${modType} "${mod.id}"`,
			{ topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.RELOAD });
		message.util?.send(`Reloaded ${modType} "${mod.id}"`);
	}
}
