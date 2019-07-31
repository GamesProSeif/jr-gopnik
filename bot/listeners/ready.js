const { Listener } = require('discord-akairo');
const fetch = require('node-fetch');

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  async exec() {
    const res = await fetch(`${this.client.config.serverHost}/api/guilds`, {
      headers: {
        apikey: process.env.TEST_API_KEY
      }
    });

    const guildsSettings = await res.json();

    guildsSettings.forEach(({ guild_id, settings }) => {
      (async () => {
        const guild = this.client.guilds.get(guild_id);
        if (guild) {
          guild.settings = settings;
        } else if (!guild && this.client.id === '540231971603742761') {
          const res = await fetch(
            `${this.client.config.serverHost}/api/guilds/${guild_id}`,
            {
              method: 'DELETE',
              headers: {
                apikey: process.env.TEST_API_KEY
              }
            }
          );

          console.log(`Deleted Guild ${guild_id}`);
        }
      })();
    });

    const settinglessGuilds = this.client.guilds.filter(
      ({ settings }) => !settings
    );
    if (settinglessGuilds[0]) {
      settingslessGuilds.forEach(guild => {
        (async () => {
          const { settings } = await (await fetch(
            `${serverHost}/api/guilds/?id=${guild.id}`,
            {
              method: 'POST',
              headers: {
                apikey: process.env.TEST_API_KEY
              }
            }
          )).json();

          console.log(`Added Guild ${guild.id}`);

          guild.settings = settings;
        })();
      });
    }

    await this.client.user.setActivity(
      `${this.client.commandHandler.prefix()}help`
    );
    console.log(`${this.client.user.username} launched...`);
  }
}

module.exports = ReadyListener;
