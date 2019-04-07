const handler = (bot, member) => {
  let leaveMessages = [
    `Looks like someone's mad, ${member} bbye.`,
    `What did I do to you ${member} ;-;. See ya forever ~~who knows~~`,
    `You said you won't leave me again ${member} 😢`,
    `Wa-wai-wait.. did ${member} just leave?`
  ];
  let generalChanenl = member.guild.channels.find(c => c.name.toUpperCase() === 'GENERAL');
  let toBeSent = leaveMessages[bot.functions.getRandom(0, leaveMessages.length)];
  generalChannel.send(toBeSent);
}

module.exports = handler;
