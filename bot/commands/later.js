const {
  readdirSync
} = require('fs');
const path = require('path');

exports.run = async (bot, message, args) => {
  try {
    let files = await readdirSync(path.join(__dirname, '..', 'assets', 'later/'));
    if (!files[0]) {
      return message.channel.send({
        embed: {
          title: 'Error',
          description: 'I have no later photos in my storage 😐',
          color: bot.config.colors.error
        }
      });
    }
    let file = path.join(__dirname, '..', 'assets', 'later', files[bot.functions.getRandom(0, files.length)]);
    await message.channel.send({
      files: [file]
    });
    await message.react(bot.config.emojis.trash);
    message.delete(3000);
  } catch (e) {
    console.log(e);
  }
}

exports.desc = 'Sends a random spongebob later photo';
exports.aliases = ['late'];