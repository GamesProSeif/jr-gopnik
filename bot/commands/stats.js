const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const fetch = require('node-fetch');
const { join } = require('path');
const { version: botVersion } = require(join(
  __dirname,
  '..',
  '..',
  'package.json'
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

    const {
      memoryUsage: serverMemoryUsage,
      version: serverVersion
    } = await (await fetch(
      `${this.client.config.serverHost}/util/stats`
    )).json();

    let guildSize, channelSize, userSize;

    if (!this.client.config.sharding) {
      guildSize = this.client.guilds.size;
      channelSize = this.client.channels.size;
      userSize = this.client.guilds.reduce((a, b) => a + b.memberCount, 0);
    } else {
      const guildSizeResults = await this.client.shard.fetchClientValues(
        'guilds.size'
      );
      const channelSizeResults = await this.client.shard.fetchClientValues(
        'channels.size'
      );
      const userSizeResults = await this.client.shard.broadcastEval(
        'this.guilds.reduce((a, b) => a + b.memberCount, 0);'
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
        '❯ General Statistics',
        `• Guilds: ${guildSize}\n• Channels: ${channelSize}\n• Users: ${userSize}`,
        false
      )
      .addField(
        '❯ Version',
        `• Bot: ${botVersion}\n• Server: ${serverVersion}`,
        true
      )
      .addField(
        '❯ Memory Usage',
        `• Bot: ${Math.round(
          process.memoryUsage().heapUsed / 1024 / 1024
        )}MB\n• Server: ${Math.round(serverMemoryUsage / 1024 / 1024)}MB`,
        true
      )
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
      .addField(
        '❯ Uptime',
        moment.duration(this.client.uptime).format('d[d ]h[h ]m[m ]s[s]'),
        true
      )
      .addField(
        '❯ Last Update',
        `[${
          commit.message.length > 20
            ? commit.message.slice(0, 20) + '...'
            : commit.message
        }](${commitURL})`,
        true
      )
      .setFooter(`© ${moment().format('YYYY')} Jr. Gopnik`);

    return message.util.send(embed);
  }
}

module.exports = StatsCommand;
