const { Router } = require('express');
const { join } = require('path');
const Guild = require(join(__dirname, '..', '..', '..', 'models', 'guild.js'));

const router = new Router();

router.get('/', (req, res) => {
  res.status(400).json({
    error: 'Main API page. Specify a valid API url. See docs'
  });
});

router.get('/guilds', async (req, res) => {
  let guilds = await Guild.find({});

  const copiedArr = guilds.map(guild => {
    const copiedObj = JSON.parse(JSON.stringify(guild));
    copiedObj.linkURL = `${req.protocol}://${req.get('host')}/api/guild/${
      guild.guild_id
    }`;
    return copiedObj;
  });

  return res.status(200).json(copiedArr);
});

router.get('/guild/:guild_id', async (req, res) => {
  if (!req.params.guild_id) {
    return res.status(400).json({ error: 'Missing guild ID parameter' });
  }

  const guild = await Guild.findOne({ guild_id: req.params.guild_id });

  if (!guild) {
    return res.status(404).json({ error: 'Guild not found' });
  }

  const copied = JSON.parse(JSON.stringify(guild));

  res.status(200).json(copied);
});

module.exports = router;
