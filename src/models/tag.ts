import { Column, Entity, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tags')
export class Tag {
	@ObjectIdColumn()
	public id!: string;

	@Column()
	public user!: string;

	@Column()
	public guild!: string;

	@Column()
	public name!: string;

	@Column()
	public content!: string;

	@Column()
	public hoisted!: boolean;

	@Column({ 'default': [] })
	public aliases!: string[];

	@Column({ 'default': 0 })
	public uses!: number;

	@Column()
	public lastModified!: string;

	@CreateDateColumn()
	public createdAt!: Date;

	@UpdateDateColumn()
	public updatedAt!: Date;
}
