const handler = async (bot, member) => {
  let joinMessages = [
    `${member}, Welcome to the server, you mug!`,
    `Thanks god, thought you were Quad for a second. Welcome, ${member}!`,
    `That's right, you are here with goats, ${member}.`,
    `Looks like ${member} came to babysit the goats...`,
    `Did you just say baaa? Already becoming a goat so fast? Welcome, ${member}!`,
    `${member} sacrifices to the goat lord`,
    `Hope you brought food ${member}, goats will literally eat anything.`,
    `What kind of username is this? Just come in ${member} smh ~~jk~~`,
    `Wait, are you a sheep ${member}? ALL GOATS SCREAM!`,
    `${member} joined. Hot goat identified. Breeding with ${member.guild.members.random()}`
  ];
  if (!member.user.bot) await member.roles.add(bot.config.roles.kid);
  else await member.roles.add(bot.config.roles.bot);

  let generalChannel = member.guild.channels.find(c => c.name.toUpperCase() === 'GENERAL');
  let toBeSent = joinMessages[bot.functions.getRandom(0, joinMessages.length)];
  generalChannel.send(toBeSent);
}

module.exports = handler;
