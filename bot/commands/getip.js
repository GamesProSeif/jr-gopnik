const fetch = require('node-fetch');
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class GetIpCommand extends Command {
  constructor() {
    super('getip', {
      aliases: ['getip', 'ip'],
      description: 'Gets information about an IP address',
      category: 'special',
      args: [
        {
          id: 'ip',
          type: /((?:^\s*(?:(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(?:^\s*(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}(?:[0-9A-Fa-f]{1,4}|:))|(?:(?:[0-9A-Fa-f]{1,4}:){6}(?::[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9A-Fa-f]{1,4}:){5}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9A-Fa-f]{1,4}:){4}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,3})|(?:(?::[0-9A-Fa-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9A-Fa-f]{1,4}:){3}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,4})|(?:(?::[0-9A-Fa-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9A-Fa-f]{1,4}:){2}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,5})|(?:(?::[0-9A-Fa-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9A-Fa-f]{1,4}:){1}(?:(?:(?::[0-9A-Fa-f]{1,4}){1,6})|(?:(?::[0-9A-Fa-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9A-Fa-f]{1,4}){1,7})|(?:(?::[0-9A-Fa-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$))/,
          prompt: {
            start: `What's the IP you want info about?`,
            retry: `That's not a valid IP! Try again.`
          },
          cooldown: 30000
        }
      ]
    });
    this.usage = '<IPv4/IPv6>';
    this.examples = [
      '123.123.123.123',
      '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
    ]
  }

  async exec(message, args) {
    const sent = await message.util.send('Getting IP information...');
    const ip = args.ip.match[args.ip.match.index]
    const url = process.env.IPINFO_API_KEY + ip;
    const response = await fetch(url);
    const json = await response.json();

    const embed = new MessageEmbed()
      .setColor(this.client.config.colors.info)
      .setTitle(`Information about IP ${json.ipAddress}`)
      .setDescription(`• Country Code: ${json.countryCode}\n• Country Name: ${json.countryName}\n• Region Name: ${json.regionName}\n• Zip Code: ${json.zipCode}\n• Latitude: ${json.latitude}\n• Longitude: ${json.longitude}\n• Time Zone: ${json.timeZone}`);

    return sent.edit({
      content: '',
      embed
     });
  }
}

module.exports = GetIpCommand;
