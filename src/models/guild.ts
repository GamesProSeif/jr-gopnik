/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('guilds')
export class Guild {
	@ObjectIdColumn()
	public _id!: string;

	@PrimaryColumn({ unique: true })
	public id!: string;

	public constructor(id: string) {
		this.id = id;
	}
}
