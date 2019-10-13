import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export enum TOPICS {
	UNHANDLED_REJECTION = 'UNHANDLED_REJECTION',
	DISCORD = 'DISCORD',
	DISCORD_AKAIRO = 'DISCORD_AKAIRO',
	MONGOOSE = 'MONGOOSE'
}

export enum EVENTS {
	INIT = 'INIT',
	ERROR = 'ERROR',
	READY = 'READY',
	WARN = 'WARN',
	DEBUG = 'DEBUG',
	COMMAND_STARTED = 'COMMAND_STARTED',
	COMMAND_BLOCKED = 'COMMAND_BLOCKED',
	COMMAND_FINISHED = 'COMMAND_FINISHED',
	COMMAND_CANCELLED = 'COMMAND_CANCELLED',
	SHARD_RESUMED = 'SHARD_RESUMED',
	SHARD_RECONNECTING = 'SHARD_RECONNECTING',
	SHARD_DISCONNECTED = 'SHARD_DISCONNECTED'
}

export const logger = createLogger({
	format: format.combine(
		format.errors({ stack: true }),
		format.label({ label: 'BOT' }),
		format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
		format.printf((info: any): string => {
			const { timestamp, label, level, message, topic, event, ...rest } = info;
			return `[${timestamp}][${label}][${level.toUpperCase()}][${topic}]${event ? `[${event}]` : ''}: ${message}${Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ''}`;
		})
	),
	transports: [
		new transports.Console({
			format: format.colorize({ level: true }),
			level: 'info'
		}),
		new DailyRotateFile({
			format: format.combine(format.timestamp(), format.json()),
			level: 'debug',
			filename: 'jrgopnik-%DATE%.log',
			maxFiles: '14d'
		})
	]
});
