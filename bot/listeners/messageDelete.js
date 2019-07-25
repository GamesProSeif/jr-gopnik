const { Listener } = require('discord-akairo');
const { join } = require('path');
const Snipe = require(join(__dirname, '..', '..', 'models', 'snipe.js'));

class MessageDeleteListener extends Listener {
  constructor() {
    super('messageDelete', {
      emitter: 'client',
      event: 'messageDelete'
    });
  }

  async exec(message) {
    try {
      if (message.author.bot || message.author.id === '305267880935555072')
        return;
      let channelSnipes = await Snipe.findAll({
        where: {
          guild: message.guild.id,
          channel: message.channel.id
        },
        order: [['createdAt']]
      });

      if (channelSnipes.length >= 10) {
        await Snipe.destroy({
          where: {
            id: channelSnipes[0].id
          }
        });
      }

      const snipe = await Snipe.create({
        id: message.id,
        guild: message.guild.id,
        channel: message.channel.id,
        author: message.author.id,
        content: message.content || null
        // attachments: message.attachments.first() ? message.attachments.first().proxyURL : null
      });

      // console.log('Added Snipe:\n', snipe);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = MessageDeleteListener;
