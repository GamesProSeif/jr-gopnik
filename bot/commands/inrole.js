const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class InRoleCommand extends Command {
  constructor() {
    super('in-role', {
      aliases: ['in-role', 'role-members', 'ir'],
      description: 'Displays all members that have a role',
      category: 'info',
      args: [
        {
          id: 'role',
          type: 'role'
        }
      ]
    });

    this.usage = '<role>';
  }

  async exec(message, { role }) {
    const members = await role.members.fetch();

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.info)
      .setDescription(`Members in role **${role.name}** (ID: ${role.id})`)
      .addField('❯ Members', members.map(member => `• ${member}`).join('\n'));

    return message.util.send(embed);
  }
}

module.exports = InRoleCommand;
