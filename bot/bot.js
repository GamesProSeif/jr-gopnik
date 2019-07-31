const path = require('path');
const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler
} = require('discord-akairo');
const clientConfig = require(path.join(
  __dirname,
  '..',
  'config',
  'config.json'
));
const clientFunctions = require(path.join(
  __dirname,
  '..',
  'config',
  'functions.js'
));

const run = () => {
  class GopnikClient extends AkairoClient {
    constructor() {
      super({
        ownerID: clientConfig.ownerID
      });

      this.commandHandler = new CommandHandler(this, {
        directory: path.join(__dirname, 'commands/'),
        prefix: message => {
          if (!message || !message.guild || !message.guild.settings)
            return clientConfig.prefix;
          const prefix = message.guild.settings.prefix;
          return prefix || clientConfig;
        },
        // prefix: message => clientConfig.prefix,
        allowMention: true,
        aliasReplacement: /-/g,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 600000,
        argumentDefaults: {
          prompt: {
            modifyStart: (message, text) =>
              `${text}\nType \`cancel\` to cancel this command.`,
            modifyRetry: (message, text) =>
              `${text}\nType \`cancel\` to cancel this command.`,
            timeout: 'Time ran out, command has been cancelled.',
            ended: 'Too many retries, command has been cancelled.',
            cancel: 'Command has been cancelled.',
            retries: 4,
            time: 30000
          }
        },
        defaultCooldown: 3000
      });

      this.inhibitorHandler = new InhibitorHandler(this, {
        directory: path.join(__dirname, 'inhibitors/')
      });

      this.listenerHandler = new ListenerHandler(this, {
        directory: path.join(__dirname, 'listeners/')
      });

      this.listenerHandler.setEmitters({
        commandHandler: this.commandHandler,
        inhibitorHandler: this.inhibitorHandler,
        listenerHandler: this.listenerHandler
      });

      this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
      this.commandHandler.useListenerHandler(this.listenerHandler);
      this.listenerHandler.loadAll();
      this.inhibitorHandler.loadAll();
      this.commandHandler.loadAll();
    }
  }

  const client = new GopnikClient();

  client.config = clientConfig;
  client.functions = clientFunctions;

  client.login(process.env.DISCORD_TOKEN || client.config.token);
};

module.exports = run();
