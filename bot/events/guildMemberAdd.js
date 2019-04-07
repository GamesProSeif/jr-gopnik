const handler = async (bot, member) => {
  let joinMessages = [
    `${member}, Welcome to the server, you mug!`,
    `Thanks god, thought you were Quad for a second. Welcome, ${member}!`,
    `That's right, you are here with goats, ${member}.`,
    `Looks like ${member} came to babysit the goats...`,
    `Did you just say baaa? Already becoming a goat so fast? Welcome, ${member}!`
  ];
  await member.addRole(bot.config.roles.kid);

  let generalChanenl = member.guild.channels.find(c => c.name.toUpperCase() === 'GENERAL');
  let toBeSent = joinMessages[bot.functions.getRandom(0, joinMessages.length)];
  generalChannel.send(toBeSent);
}

module.exports = handler;
