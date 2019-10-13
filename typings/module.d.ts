import { Collection, Snowflake } from 'discord.js';
import { ClientConfig, GopnikFunctions, IGuildSettings, ISnipe } from '.';
import { Logger } from 'winston';

declare module 'discord-akairo' {
	interface AkairoClient {
		logger: Logger;
		ready: boolean;
		config: ClientConfig;
		functions: GopnikFunctions;
		commandHandler: CommandHandler;
		listenerHandler: ListenerHandler;
		inhibitorHandler: InhibitorHandler;
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
	interface Guild {
		settings: IGuildSettings | null;
		editSettings(data: any): Promise<boolean>;
	}

	interface TextChannel {
		snipe: Collection<Snowflake, ISnipe>;
	}
}
