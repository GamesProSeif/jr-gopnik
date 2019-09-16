import { Collection, Snowflake } from 'discord.js';
import { ClientConfig, GopnikFunctions, IGuildSettings, ISnipe } from '.';

declare module 'discord-akairo' {
	interface AkairoClient {
		ready: boolean;
		config: ClientConfig;
		functions: GopnikFunctions;
		commandHandler: CommandHandler;
		listenerHandler: ListenerHandler;
		inhibitorHandler: InhibitorHandler;
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
