const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const momentDurationFormatSetup = require("moment-duration-format");
const { join } = require('path');
const { version } = require(join(__dirname, '..', '..', 'package.json'));

class StatsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats', 'statistics'],
      description: 'Displays the stats of the bot',
      category: 'util'
    });
  }

  exec(message) {
    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.info)
      .setThumbnail(this.client.user.displayAvatarURL())
      .setDescription(`**${this.client.user.username} Statistics**`)
      .addField('❯ Uptime', moment.duration(this.client.uptime).format('d[d ]h[h ]m[m ]s[s]'), true)
      .addField('❯ Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
      .addField('❯ General Statistics', `• Guilds: ${this.client.guilds.size}\n• Channels: ${this.client.channels.size}`, true)
      .addField('❯ Version', version, true)
      .addField('❯ Source Code', `[View Here](https://github.com/GamesProSeif/jr-gopnik-akairo/)`, true)
      .addField('❯ Library', `[discord.js](https://discord.js.org/) - [akairo](https://discord-akairo.github.io/)`, true)
      .setFooter(`© ${moment().format('YYYY')} Jr. Gopnik`);

    return message.util.send(embed);
  }
}

module.exports = StatsCommand;
