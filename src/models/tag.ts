import { model, Schema } from 'mongoose';
import { ITag } from 'typings';

export const TagSchema = new Schema({
	user: {
		type: String,
		required: true
	},
	guild: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	hoisted: {
		'type': Boolean,
		'default': false
	},
	aliases: {
		type: [String]
	},
	uses: {
		'type': Number,
		'default': 0
	},
	lastModified: {
		type: String
	},
	createdAt: {
		'type': Number,
		'default': Date.now
	},
	updatedAt: {
		'type': Number,
		'default': Date.now
	}
});

export const TagModel = model<ITag>('tags', TagSchema);
