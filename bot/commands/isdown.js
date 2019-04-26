const fetch = require('node-fetch');

exports.run = async (bot, message, args) => {
  if (!args[0]) {
    return message.channel.send('Give me the link I need to check wth?!?');
  }
  let sent = await message.channel.send('Checking the website...');
  let res = await fetch('https://api.downfor.cloud/httpcheck/' + args.join(' '));
  let json = await res.json();
  let reply = json.isDown ? `Yup, looks like <${json.returnedUrl}> is down for me too.` : `Nah, <${json.returnedUrl}> is fine.`;
  sent.edit(reply);
}

exports.desc = 'Checks whether a website is down';
exports.usage = '<link>';
exports.examples = [
  'google.com'
];
exports.cooldown = 20;
