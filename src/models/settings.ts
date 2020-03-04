/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, ObjectIdColumn, Column, PrimaryColumn } from 'typeorm';
import { PREFIX } from '../util/constants';

export interface ISettings {
	prefix: string;
	user_role: string | null;
	bot_role: string | null;
	auto_assign_roles: boolean;
	member_logs_channel: string | null;
	logging: boolean;
}

@Entity()
export class Settings implements Partial<ISettings> {
	@ObjectIdColumn()
	public _id?: string;

	@PrimaryColumn()
	public id!: string;

	@Column({ 'default': PREFIX })
	prefix?: string;

	@Column({ nullable: true })
	user_role?: string | null;

	@Column({ nullable: true })
	bot_role?: string | null;

	@Column()
	auto_assign_roles?: boolean;

	@Column({ nullable: true })
	member_logs_channel?: string | null;

	@Column()
	logging?: boolean;

	public constructor(id: string, {
		prefix = PREFIX,
		user_role = null,
		bot_role = null,
		auto_assign_roles = false,
		member_logs_channel = null,
		logging = false
	}: Partial<ISettings> = {}) {
		this.id = id;

		this.prefix = prefix;
		this.user_role = user_role;
		this.bot_role = bot_role;
		this.auto_assign_roles = auto_assign_roles;
		this.member_logs_channel = member_logs_channel;
		this.logging = logging;
	}
}
