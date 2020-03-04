import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { COLORS } from '../../util/constants';

export default class EditsCommand extends Command {
	constructor() {
		super('edits', {
			aliases: ['edits'],
			description: {
				content: 'Views edits of a message',
				usage: '[--channel <channel>] <message-id>'
			},
			channel: 'guild',
			category: 'text',
			flags: ['--channel', '-c']
		});
	}

	public *args() {
		const channelFlag = yield {
			match: 'flag',
			flag: ['--channel', '-c']
		};

		if (channelFlag) {
			const channel = yield {
				type: 'textChannel',
				prompt: {
					start: 'What is the channel you are looking for?',
					retry: 'Invalid text channel! Try again.'
				}
			};

			// tslint:disable-next-line: no-shadowed-variable
			const editedMessage = yield {
				type: async (_: Message, phrase: string) => {
					if (!phrase || !(/[0-9]{17,19}/.test(phrase))) return null;
					try {
						const msg = await channel.messages.fetch(phrase);
						return msg;
					} catch (error) {
						return null;
					}
				},
				prompt: {
					retry: `Couldn't get message! Try another ID`,
					start: `What's the ID of the message you want the edits of?`
				}
			};
			return { editedMessage };
		}
		const editedMessage = yield {
			type: 'message',
			prompt: {
				retry: `Couldn't get message! Try another ID`,
				start: `What's the ID of the message you want the edits of?`
			}
		};

		return { editedMessage };
	}

	public exec(message: Message, { editedMessage }: { editedMessage: Message }) {
		let edits = editedMessage.edits;

		const original = edits.splice(
			edits.findIndex((m: Message) => m.editedTimestamp === null),
			1
		)[0];
		edits = edits.sort(
			(a: Message, b: Message) => a.editedTimestamp! - b.editedTimestamp!
		);

		const embed = new MessageEmbed()
			.setColor(COLORS.PRIMARY)
			.setAuthor(
				editedMessage.author!.tag,
				editedMessage.author!.displayAvatarURL()
			)
			.setDescription(
				`Viewing edits of **${editedMessage.author!.tag}**'s message (ID: ${editedMessage.id})`
			)
			.addField('❯ Original', original.content);

		edits.forEach((m: Message, i: number) =>
			embed.addField(`❯ ${i + 1}`, m.content));

		return message.util!.send(embed);
	}
}
