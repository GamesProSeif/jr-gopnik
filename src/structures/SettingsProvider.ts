import { AkairoClient, Provider } from 'discord-akairo';
import { Guild } from 'discord.js';
import { Settings } from '../models/settings';

export default class SettingsProvider extends Provider {
	public client: AkairoClient;

	public constructor(client: AkairoClient) {
		super();
		this.client = client;
	}

	public get repo() {
		return this.client.db.getRepository(Settings);
	}

	public async init() {
		const settings = await this.repo.find({});
		for (const setting of settings) {
			this.items.set(setting.id, setting);
		}
	}

	public get<K extends keyof Settings, T = undefined>(
		guild: string | Guild,
		key: K,
		defaultValue?: T
	): Settings[K] | T {
		const id = SettingsProvider.resolveGuild(guild);
		if (this.items.has(id)) {
			const value = this.items.get(id)![key];
			return value ?? (defaultValue as T);
		}

		return defaultValue as T;
	}

	public async set(guild: string | Guild, key: string, value: any) {
		const id = SettingsProvider.resolveGuild(guild);
		const data = this.items.get(id) || new Settings(id);
		data[key] = value;
		this.items.set(id, data);

		const settings = await this.repo.save(data as Settings);
		return settings;
	}

	public async delete(guild: string | Guild, key: keyof Settings) {
		const id = SettingsProvider.resolveGuild(guild);
		const data = this.items.get(id) || { id };
		delete data[key];

		const settings = await this.repo.save(data as Settings);
		return settings;
	}

	public async clear(guild: string | Guild) {
		const id = SettingsProvider.resolveGuild(guild);
		this.items.delete(id);

		const res = await this.repo.delete(id);
		return (typeof res.affected === 'number' && res.affected > 0);
	}

	private static resolveGuild(guild: string | Guild) {
		if (guild instanceof Guild) return guild.id;
		if (guild === 'global' || guild === null) return '0';
		if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild;
		throw new TypeError('Invalid guild specified. Must be a Guild instance, guild ID, "global", or null.');
	}
}
