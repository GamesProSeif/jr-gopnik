const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const fetch = require('node-fetch');
const { join } = require('path');
const { version } = require(join(__dirname, '..', '..', 'package.json'));
const { sharding } = require(join(
  __dirname,
  '..',
  '..',
  'config',
  'config.json'
));

class StatsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats', 'statistics'],
      description: 'Displays the stats of the bot',
      category: 'util'
    });
  }

  async exec(message) {
    const { commit, html_url: commitURL } = (await (await fetch(
      'https://api.github.com/repos/gamesproseif/jr-gopnik/commits'
    )).json())[0];

    let guildSize, channelSize, userSize;

    if (!sharding) {
      guildSize = this.client.guilds.size;
      channelSize = this.client.channels.size;
      userSize = this.client.users.size;
    } else {
      const guildSizeResults = await this.client.shard.fetchClientValues(
        'guilds.size'
      );
      const channelSizeResults = await this.client.shard.fetchClientValues(
        'channels.size'
      );
      const userSizeResults = await this.client.shard.fetchClientValues(
        'users.size'
      );
      guildSize = guildSizeResults.reduce((a, b) => a + b);
      channelSize = channelSizeResults.reduce((a, b) => a + b);
      userSize = userSizeResults.reduce((a, b) => a + b);
    }

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.info)
      .setThumbnail(this.client.user.displayAvatarURL())
      .setDescription(`**${this.client.user.username} Statistics**`)
      .addField(
        '❯ Uptime',
        moment.duration(this.client.uptime).format('d[d ]h[h ]m[m ]s[s]'),
        true
      )
      .addField(
        '❯ Memory Usage',
        `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
        true
      )
      .addField(
        '❯ General Statistics',
        `• Guilds: ${guildSize}\n• Channels: ${channelSize}\n• Users: ${userSize}`,
        true
      )
      .addField('❯ Version', version, true)
      .addField(
        '❯ Source Code',
        `[View Here](https://github.com/GamesProSeif/jr-gopnik/)`,
        true
      )
      .addField(
        '❯ Library',
        `[discord.js](https://discord.js.org/) - [akairo](https://discord-akairo.github.io/)`,
        true
      )
      .addField('❯ Last Update', `[${commit.message}](${commitURL})`)
      .setFooter(`© ${moment().format('YYYY')} Jr. Gopnik`);

    return message.util.send(embed);
  }
}

module.exports = StatsCommand;
