const { Command } = require('discord-akairo');

class DeleteRoleCommand extends Command {
  constructor() {
    super('delete-role', {
      aliases: ['delete-role', 'dr'],
      description: 'Adds a role to the server',
      category: 'mod',
      clientPermissions: ['MANAGE_ROLES'],
      userPermissions: ['MANAGE_ROLES'],
      args: [
        {
          id: 'role',
          type: 'role',
          prompt: {
            start: `What's the role?`,
            retry: `Invalid role! Try again.`
          }
        }
      ]
    });

    this.usage = ['<role>'];
  }

  async exec(message, { role }) {
    if (role.position >= message.guild.me.roles.highest.position) {
      return this.client.commandHandler.emit(
        'missingPermissions',
        message,
        this.client.commandHandler.modules.get('kick'),
        'client',
        ['Role same or higher in role hierarchy']
      );
    }

    await role.delete(`Deleted role by ${message.author.tag}`);

    return message.util.send(`✅ Deleted role "${role.name}"`);
  }
}

module.exports = DeleteRoleCommand;
