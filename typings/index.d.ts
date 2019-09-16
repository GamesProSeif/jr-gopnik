import { Message, Snowflake } from 'discord.js';
import {
	AkairoClient,
	CommandHandler,
	ListenerHandler,
	InhibitorHandler,
	Command
} from 'discord-akairo';
import { Document } from 'mongoose';

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

export interface IGuildSettings {
	prefix: string;
	user_role: Snowflake | null;
	bot_role: Snowflake | null;
	auto_assign_roles: boolean;
	member_logs_channel: Snowflake | null;
	logging: boolean;
}

export interface IGuild extends Document {
	id: Snowflake;
	settings: IGuildSettings;
}

export interface IGuildData {
	id: Snowflake;
}

export interface GopnikCommandHandler extends CommandHandler {
	prefix(message?: Message): string;
}

export interface AkairoClient extends AkairoClient {
	commandHandler: GopnikCommandHandler;
	listenerHandler: ListenerHandler;
	inhibitorHandler: InhibitorHandler;
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

export interface ITag extends Document {
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
