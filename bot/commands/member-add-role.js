const { Command } = require('discord-akairo');

class MemberAddRoleCommand extends Command {
  constructor() {
    super('member-add-role', {
      aliases: ['member-add-role', 'mar'],
      description: 'Adds a role to a member',
      category: 'mod',
      clientPermissions: ['MANAGE_ROLES'],
      userPermissions: ['MANAGE_ROLES'],
      args: [
        {
          id: 'role',
          type: 'role',
          prompt: {
            start: `What's the role?`
          }
        },
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: `Who is the member?`,
            retry: 'Invalid member! Try again'
          }
        }
      ]
    });

    this.usage = ['<role> <member>'];
  }

  async exec(message, { role, member }) {
    if (role.position >= message.guild.me.roles.highest.position) {
      return this.client.commandHandler.emit(
        'missingPermissions',
        message,
        this.client.commandHandler.modules.get('kick'),
        'client',
        ['Role same or higher in role hierarchy']
      );
    }

    await member.roles.add(role, `Role add by ${message.author.tag}`);
    return message.util.send(
      `✅ Added role "${role.name}" to ${member.user.tag}`
    );
  }
}

module.exports = MemberAddRoleCommand;
