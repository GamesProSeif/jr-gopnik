import { Command } from 'discord-akairo';
import {
  GuildMember,
  Message,
  MessageEmbed,
  Role,
} from 'discord.js';

interface RaffleArgs {
  type: 'all' | 'user' | 'bot';
  status: 'all' | 'online' | 'idle' | 'dnd' | 'offline';
  role?: Role;
}

export default class RaffleCommand extends Command {
  constructor() {
    super('raffle', {
      aliases: ['raffle'],
      description: {
        content: 'Raffles a random member',
        usage: '[type:] [status:] [role:]',
        examples: ['', 'type:bot', 'status:online role:Mods']
      },
      category: 'gamble',
      channel: 'guild',
      args: [
        {
          id: 'type',
          type: [
            ['all', 'everyone'],
            ['user', 'users', 'member', 'members'],
            ['bot', 'bots', 'robot', 'robots']
          ],
          match: 'option',
          flag: ['type:'],
          default: 'all',
          prompt: {
            start: `Whats the type of the raffle? (all/user/bot)`,
            retry: `Invalid type! Try again. (all/user/bot)`,
            optional: true
          }
        },
        {
          id: 'status',
          type: [
            ['all', 'everyone'],
            ['online', 'on', 'active'],
            ['idle', 'afk'],
            ['dnd'],
            ['offline', 'off', 'invisible']
          ],
          match: 'option',
          flag: ['status:'],
          default: 'all',
          prompt: {
            start: `Whats the status of the members? (all/online/idle/dnd/offline)`,
            retry: `Invalid status! Try again. (all/online/idle/dnd/offline)`,
            optional: true
          }
        },
        {
          id: 'role',
          type: 'role',
          match: 'option',
          flag: ['role:'],
          default: null,
          prompt: {
            start: `Whats the role of the members?`,
            retry: `Invalid role! Try again`,
            optional: true
          }
        }
      ]
    });
  }

  public async exec(message: Message, args: RaffleArgs) {
    let members = message.guild!.members.filter(() => true);

    if (args.type === 'all') {
      // Do nothing
    } else if (args.type === 'user') {
      members = members.filter(m => !m.user.bot);
    } else if (args.type === 'bot') {
      members = members.filter(m => m.user.bot);
    }

    if (args.status === 'all') {
      // Do nothing
    } else if (args.status === 'online') {
      members = members.filter(m => m.user.presence.status === 'online');
    } else if (args.status === 'idle') {
      members = members.filter(m => m.user.presence.status === 'idle');
    } else if (args.status === 'offline') {
      members = members.filter(m => m.user.presence.status === 'offline');
    }

    if (args.role) {
      // tslint:disable-next-line: no-shadowed-variable
      members = members.filter((member: GuildMember) =>
        member.roles.has(args.role!.id)
      );
    }

    if (!members.size) {
      return message.util!.send({
        embed: {
          title: 'Error',
          description: 'No members matched your query',
          color: this.client.config.colors!.error
        }
      });
    }

    const member = members.random();

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors!.primary)
      .setTitle(`🎫 Raffled Member`)
      .setDescription(`${member}\nID: ${member!.id}`)
      .setFooter(member!.user.tag, member!.user.displayAvatarURL());

    return message.util!.send(embed);
  }
}
