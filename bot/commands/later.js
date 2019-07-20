const { readdirSync } = require('fs');
const path = require('path');

const { Command } = require('discord-akairo');

class LaterCommand extends Command {
  constructor() {
    super('later', {
      aliases: ['later'],
      description: 'Sends a random spongebob later photo',
      category: 'meme'
    });
  }

  async exec(message) {
    try {
      let files = await readdirSync(path.join(__dirname, '..', 'assets', 'later/'));
      if (!files[0]) {
        return message.util.send({
          embed: {
            title: 'Error',
            description: 'I have no later photos in my storage 😐',
            color: this.client.config.colors.error
          }
        });
      }
      let file = path.join(__dirname, '..', 'assets', 'later', files[this.client.functions.getRandom(0, files.length)]);
      return message.util.send({
        files: [file]
      });
    } catch (e) {
      return console.log(e);
    }
  }
}

module.exports = LaterCommand;
