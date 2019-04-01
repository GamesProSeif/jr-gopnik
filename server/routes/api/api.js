const {
  Router
} = require('express');
const router = new Router();

module.exports = (bot) => {
  router.get('/', (req, res) => {
    res.status(400).json({
      error: 'Main API page. Specify a valid API url. See docs'
    });
  });

  let botUser;
  let guilds;

  bot.on('ready', () => {
    botUser = {
      id: bot.user.id,
      username: bot.user.username,
      tag: bot.user.tag,
      avatarURL: bot.user.avatarURL,
      createdAt: bot.user.createdAt,
      createdTimestamp: bot.user.createdTimestamp
    }
    guilds = bot.guilds;
  });

  router.get('/bot', (req, res, next) => {
    res.status(200).json(botUser);
    next();
  });

  router.get('/guilds', (req, res, next) => {
    res.status(200).json(guilds.map(g => {
      return {
        id: g.id,
        name: g.name
      }
    }));
    next();
  });

  router.get('/guilds/:guildId', (req, res, next) => {
    let id = req.params.guildId;
    if (guilds.has(id)) {
      let guild = guilds.get(id);
      res.json({
        id: guild.id,
        name: guild.name,
        owner: guild.owner.username,
        iconURL: guild.iconURL,
        createdAt: guild.createdAt,
        createdTimestamp: guild.createdTimestamp,
        channels: guild.channels.map(c => {
          return {
            id: c.id,
            name: c.name,
            type: c.type
          }
        }),
        roles: guild.roles.map(r => {
          return {
            id: r.id,
            name: r.name
          }
        }),
        members: guild.members.map(m => {
          return {
            id: m.id,
            name: m.user.username,
            bot: m.user.bot
          }
        })
      });
    } else {
      res.json({
        error: `No guild found with id ${id}`
      });
    }
    next();
  });

  router.get('/commands', (req, res, next) => {
    res.json(bot.commands.map(c => {return {name: c.name, usage: c.usage, desc: c.desc, group: c.group, guildOnly: c.guildOnly, aliases: c.aliases}}));
    next();
  });

  return router;
}
