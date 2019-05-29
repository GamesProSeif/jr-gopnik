const fetch = require('node-fetch');

const getIp = async (bot, message, args) => {
  if (!args[0]) {
    return message.channel.send({
      embed: {
        title: 'Error',
        description: 'No IP was specified',
        color: bot.config.colors.error
      }
    });
  }

  if (args.length > 1) {
    return message.channel.send({
      embed: {
        title: 'Error',
        description: `Only one parameter is needed.\nReceived: ${args.length}`,
        color: bot.config.colors.error
      }
    });
  }

  let regex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

  if (!regex.test(args[0])) {
    return message.channel.send({
      embed: {
        title: 'Error',
        description: `\`${args[0]}\` is neither an IPv4, nor IPv6.`,
        color: bot.config.colors.error
      }
    });
  }

  let sent = await message.channel.send('Getting IP information...');

  let url = process.env.IPINFO_API_KEY + args[0];
  fetch(url)
    .then(res => res.json())
    .then(json => {
      sent.edit(JSON.stringify(json, null, 2), {
        code: 'json'
      });
    });
}

exports.run = (bot, message, args) => {
  if (!args[0]) {
    message.reply(`what's the ip you want information about?\n\nType \`cancel\` to cancel the command`);
    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, {max: 1, time: 10000, errors: ['time']});

    collector.on('end', (collected, reason) => {
      if (reason === 'limit') {
        if (collected.first().content.toUpperCase() === 'CANCEL') {
          return message.channel.send('Cancelled');
        } else {
          return getIp(bot, message, collected.first().content.split(/\s+/));
        }
      } else {
        return message.channel.send({embed:{
          title: 'Error',
          description: `Didn't get any response after 10 seconds\nEnded command`,
          color: bot.config.colors.error
        }});
      }
    });
  } else {
    getIp(bot, message, args);
  }
}

exports.desc = 'Gets the location of an IPv4/IPv6 address';
exports.usage = '<IPv4|IPv6>';
exports.aliases = ['ip'];
exports.examples = [
  '123.123.123.123',
  '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
];
exports.cooldown = 30;
