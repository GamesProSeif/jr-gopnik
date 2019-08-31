import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler
} from 'discord-akairo';
import { join } from 'path';
import clientConfig from '../../../config.json';
import * as clientFunctions from '../../config/functions';
import { ClientConfig } from '../../typings/index.js';

const commandsPath = join(__dirname, '..', 'commands/');
const inhibitorsPath = join(__dirname, '..', 'inhibitors/');
const listenersPath = join(__dirname, '..', 'listeners/');

export default class GopnikClient extends AkairoClient {
  public ready = false;

  public config: ClientConfig = clientConfig;

  public functions = clientFunctions;

  public commandHandler: CommandHandler = new CommandHandler(this, {
    aliasReplacement: /-/g,
    allowMention: true,
    argumentDefaults: {
      prompt: {
        cancel: 'Command has been cancelled.',
        ended: 'Too many retries, command has been cancelled.',
        modifyRetry: (message, text) =>
          `${message.member}, ${text}\n\nType \`cancel\` to cancel this command.`,
        modifyStart: (message, text) =>
          `${message.member}, ${text}\n\nType \`cancel\` to cancel this command.`,
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
      if (process.env.NODE_ENV === 'development')
        return this.config.prefix.replace(/.$/, '@');
      if (!message || !message.guild || !message.guild.settings) {
        return this.config.prefix;
      }
      const prefix = message.guild.settings.prefix;
      return prefix || this.config.prefix;
    },
    storeMessages: true
  });

  public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
    directory: inhibitorsPath
  });

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: listenersPath
  });

  public constructor() {
    super({ ownerID: clientConfig.ownerID });
  }

  public async start(token: string) {
    await this._init();
    return this.login(token);
  }

  private async _init() {
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
      process
    });

    this.commandHandler.loadAll();
    this.inhibitorHandler.loadAll();
    this.listenerHandler.loadAll();
  }
}