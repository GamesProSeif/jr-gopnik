const { Command } = require('discord-akairo');

class AddRoleCommand extends Command {
  constructor() {
    super('add-role', {
      aliases: ['add-role', 'create-role', 'ar'],
      description: 'Adds a role to the server',
      category: 'mod',
      clientPermissions: ['MANAGE_ROLES'],
      userPermissions: ['MANAGE_ROLES'],
      args: [
        {
          id: 'name',
          prompt: {
            start: `What's the name of the role?`
          }
        },
        {
          id: 'color',
          type: 'color',
          default: 0,
          prompt: {
            start: `What's the color of the role?`,
            retry: 'Invalid color! Try again',
            optional: true
          }
        }
      ]
    });

    this.usage = ['<role> [color]'];
  }

  async exec(message, { name, color }) {
    const role = await message.guild.roles.create({
      data: {
        name,
        color
      },
      reason: `Role added by ${message.author.tag}`
    });

    return message.util.send(`✅ Added role "${role.name}"`);
  }
}

module.exports = AddRoleCommand;
