const fetch = require('node-fetch');
const { Command } = require('discord-akairo');

class IsDownCommand extends Command {
  constructor() {
    super('isdown', {
      aliases: ['isdown'],
      description: 'Checks if a website is down',
      category: 'special',
      args: [
        {
          id: 'url',
          type: 'url',
          prompt: {
            start: `What's the URL you want to check?`,
            retry: `Invalid URL! Try again.`
          }
        }
      ]
    });

    this.usage = '<url>';
  }

  async exec(message, args) {
    let sent = await message.util.send('Checking the website...');
    try {
      let res = await fetch(args.url.href);

      let reply = res.ok ? `Nah, <${args.url.href}> is fine.` : `Yup, looks like <${args.url.href}> is down for me too.`;
      return sent.edit(reply);
    } catch (e) {
      return sent.edit(`Yup, looks like <${args.url.href}> is down for me too.`);
    }
  }
}

module.exports = IsDownCommand;
