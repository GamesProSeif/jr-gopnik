import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler
} from 'discord-akairo';
import { join } from 'path';
import clientConfig from '../../../config.json';
import * as clientFunctions from '../../config/functions';

const commandsPath = join(__dirname, '..', 'commands/');
const inhibitorsPath = join(__dirname, '..', 'inhibitors/');
const listenersPath = join(__dirname, '..', 'listeners/');

export default class GopnikClient extends AkairoClient {
  constructor() {
    super({
      ownerID: clientConfig.ownerID
    });
    this.ready = false;
    this.commandHandler = new CommandHandler(this, {
      aliasReplacement: /-/g,
      allowMention: true,
      argumentDefaults: {
        prompt: {
          cancel: 'Command has been cancelled.',
          ended: 'Too many retries, command has been cancelled.',
          modifyRetry: (message, text) =>
            `${message.member}, ${text}\nType \`cancel\` to cancel this command.`,
          modifyStart: (message, text) =>
            `${message.member}, ${text}\nType \`cancel\` to cancel this command.`,
          retries: 3,
          time: 30000,
          timeout: 'Time ran out, command has been cancelled.'
        }
      },
      commandUtil: true,
      commandUtilLifetime: 600000,
      defaultCooldown: 3000,
      directory: commandsPath,
      handleEdits: true,
      prefix: (message?) => {
        if (!message || !message.guild || !message.guild.settings) {
          return clientConfig.prefix;
        }
        const prefix = message.guild.settings.prefix;
        return prefix || clientConfig.prefix;
      },
      storeMessages: true
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: inhibitorsPath
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: listenersPath
    });

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
      process
    });

    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
    this.inhibitorHandler.loadAll();
    this.commandHandler.loadAll();
    this.config = clientConfig;
    this.functions = clientFunctions;
  }
}
