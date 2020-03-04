import { Collection, Snowflake } from 'discord.js';
import { GopnikFunctions, ISnipe } from '.';
import { Logger } from 'winston';
import { Connection } from 'typeorm';
import SettingsProvider from 'src/structures/SettingsProvider';

declare module 'discord-akairo' {
	interface AkairoClient {
		db: Connection;
		logger: Logger;
		ready: boolean;
		functions: GopnikFunctions;
		commandHandler: CommandHandler;
		listenerHandler: ListenerHandler;
		inhibitorHandler: InhibitorHandler;
		settings: SettingsProvider;
	}

	interface CommandOptions {
		description?: {
			content: string;
			usage?: string;
			examples: string[];
		} | any;
	}
}

declare module 'discord.js' {
	interface TextChannel {
		snipe: Collection<Snowflake, ISnipe>;
	}
}
