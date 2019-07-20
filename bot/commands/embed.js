const { Command } = require('discord-akairo');

class EmbedCommmand extends Command {
  constructor() {
    super('embed', {
      aliases: ['embed'],
      description: 'Generates an Embed from raw JSON input',
      category: 'text',
      args: [
        {
          id: 'json',
          match: 'content',
          prompt: {
            start: `What's the JSON you want me to convert?`
          }
        }
      ]
    });
    this.usage = '<JSON>';
    this.examples = ['{"title": "My title", "description": "My description"}'];
  }

  async exec(message, args) {
    try {
      console.log(args.json);
      let embed = await JSON.parse(args.json);
      if (embed.color) {
        embed.color = parseInt(embed.color.replace('#', '0x'));
      }
      return message.util.send({embed});
    } catch (e) {
      return message.util.send({
        embed: {
          title: 'Error',
          description: `**Error name:** ${e.name}\n**Type:** ${e.message}`,
          color: this.client.config.colors.error
        }
      });
    }
  }
}

module.exports = EmbedCommmand;
