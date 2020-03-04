import { Message, Snowflake } from 'discord.js';
import {
	CommandHandler,
	Command
} from 'discord-akairo';

export interface ClientConfig {
	ownerID: Snowflake[];
	prefix: string;
	sharding: boolean;
	colors?: {
		primary: string;
		secondary: string;
		info: string;
		warning: string;
		error: string;
	};
	emojis?: object;
	token?: string;
}

export interface GopnikCommandHandler extends CommandHandler {
	prefix(message?: Message): string;
}

export interface GopnikCommand extends Command {
	examples: string[];
	usage: string;
}

export interface GopnikFunctions {
	capitalize(text: string): string;
	getRandom(num1: number, num2: number): number;
	clean(text: string): string;
}

export interface ISnipe {
	id: Snowflake;
	author: Snowflake;
	content?: string;
	attachments?: string[];
	timestamp: number;
}

export interface ITag {
	user: Snowflake;
	guild: Snowflake;
	name: string;
	content: string;
	aliases: string[];
	hoisted: boolean;
	uses: number;
	lastModified?: Snowflake;
	createdAt: number;
	updatedAt: number;
}
