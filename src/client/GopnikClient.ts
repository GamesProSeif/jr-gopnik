import {
	AkairoClient,
	CommandHandler,
	Flag,
	InhibitorHandler,
	ListenerHandler
} from 'discord-akairo';
import { Util } from 'discord.js';
import { join } from 'path';
import { generateLogger } from 'gamesproseif-common';
import { Logger } from 'winston';
import { Raw } from 'typeorm';
import * as clientFunctions from '../util/functions';
import { EVENTS, TOPICS, DEVELOPMENT, PREFIX, OWNER_ID, MESSAGES } from '../util/constants';
import Database from '../structures/Database';
import { Tag } from '../models/tag';
import SettingsProvider from '../structures/SettingsProvider';

const commandsPath = join(__dirname, '..', 'commands/');
const inhibitorsPath = join(__dirname, '..', 'inhibitors/');
const listenersPath = join(__dirname, '..', 'listeners/');

export default class GopnikClient extends AkairoClient {
	public ready = false;

	public logger: Logger = generateLogger({
		label: 'BOT',
		prefix: 'jrgopnik',
		dirname: join(process.cwd(), 'logs/'),
		enableRotateFile: true
	});

	public db = Database;

	public functions = clientFunctions;

	public commandHandler: CommandHandler = new CommandHandler(this, {
		aliasReplacement: /-/g,
		allowMention: true,
		argumentDefaults: {
			prompt: {
				cancel: MESSAGES.CLIENT.COMMAND_HANDLER.PROMPT_CANCEL,
				ended: MESSAGES.CLIENT.COMMAND_HANDLER.PROMPT_CANCEL,
				modifyRetry: MESSAGES.CLIENT.COMMAND_HANDLER.MODIFY_RETRY,
				modifyStart: MESSAGES.CLIENT.COMMAND_HANDLER.MODIFY_START,
				retries: 3,
				time: 30000,
				timeout: MESSAGES.CLIENT.COMMAND_HANDLER.TIMEOUT
			}
		},
		commandUtil: true,
		commandUtilLifetime: 600000,
		defaultCooldown: 3000,
		directory: commandsPath,
		handleEdits: true,
		prefix: message => {
			if (DEVELOPMENT) {
				return PREFIX.replace(/.$/, '@');
			}
			const prefix = this.settings.get(message && message.guild ? message.guild.id : 'global', 'prefix', PREFIX)!;
			return prefix;
		},
		storeMessages: true
	});

	public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
		directory: inhibitorsPath
	});

	public listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: listenersPath
	});

	public settings: SettingsProvider = new SettingsProvider(this);

	public constructor() {
		super({ ownerID: OWNER_ID });

		this.commandHandler.resolver.addType('tag', async (message, phrase) => {
			const tagsRepo = this.db.getRepository(Tag);
			if (!phrase) return Flag.fail(phrase);
			phrase = Util.cleanContent(phrase.toLowerCase(), message);
			let tag;
			try {
				tag = await tagsRepo.findOne({
					where: {
						$or: [
							{ name: phrase, guild: message.guild!.id },
							{ aliases: Raw((alias?: string) => `${alias} @> ARRAY['${phrase}']`), guild: message.guild!.id }
						]
					}
				});
				// tslint:disable-next-line: no-empty
			} catch (error) {
				console.error(error);
			}

			return tag || Flag.fail(phrase);
		});

		this.commandHandler.resolver.addType(
			'existingTag',
			async (message, phrase) => {
				const tagsRepo = this.db.getRepository(Tag);
				if (!phrase) return Flag.fail(phrase);
				phrase = Util.cleanContent(phrase.toLowerCase(), message);
				let tag;
				try {
					tag = await tagsRepo.findOne({
						where: {
							$or: [
								{ name: phrase, guild: message.guild!.id },
								{ aliases: Raw((alias?: string) => `${alias} @> ARRAY['${phrase}']`), guild: message.guild!.id }
							]
						}
					});
					// tslint:disable-next-line: no-empty
				} catch {}

				return tag ? Flag.fail(phrase) : phrase;
			}
		);

		this.commandHandler.resolver.addType(
			'tagContent',
			async (message, phrase) => {
				if (!phrase) phrase = '';
				phrase = Util.cleanContent(phrase, message);
				if (message.attachments.first()) {
					phrase += `\n${message.attachments.first()!.url}`;
				}

				return phrase || Flag.fail(phrase);
			}
		);
	}

	public async start(token: string) {
		await this._init();
		return this.login(token);
	}

	private async _init() {
		await this.db.connect();
		this.logger.info(MESSAGES.CLIENT.DB_CONNECTED, { topic: TOPICS.MONGO_DB, event: EVENTS.READY });

		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);

		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler,
			process
		});

		this.commandHandler.loadAll();
		this.logger.info(MESSAGES.CLIENT.COMMAND_HANDLER.LOADED, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
		this.inhibitorHandler.loadAll();
		this.logger.info(MESSAGES.CLIENT.INHIBITOR_HANDLER.LOADED, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
		this.listenerHandler.loadAll();
		this.logger.info(MESSAGES.CLIENT.LISTENER_HANDLER.LOADED, { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.INIT });
	}
}
