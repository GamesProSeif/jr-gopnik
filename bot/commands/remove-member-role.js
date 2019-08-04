const { Command } = require('discord-akairo');

class MemberRemoveRoleCommand extends Command {
  constructor() {
    super('member-remove-role', {
      aliases: ['member-remove-role', 'mrr'],
      description: 'Removes a role from a member',
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
    if (!member.roles.has(role.id)) {
      return message.util.send({
        embed: {
          title: 'Error',
          description: `Member doesn't have the mentioned role`,
          color: this.client.config.colors.error
        }
      });
    }

    if (role.position >= message.guild.me.roles.highest.position) {
      return this.client.commandHandler.emit(
        'missingPermissions',
        message,
        this.client.commandHandler.modules.get('kick'),
        'client',
        ['Role same or higher in role hierarchy']
      );
    }

    await member.roles.remove(role, `Role removed by ${message.author.tag}`);
    return message.util.send(
      `✅ Removed role "${role.name}" from ${member.user.tag}`
    );
  }
}

module.exports = MemberRemoveRoleCommand;
