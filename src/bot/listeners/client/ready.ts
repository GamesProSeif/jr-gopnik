import { Listener } from 'discord-akairo';
import { prefix } from '../../../../config.json';

export default class Ready extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  public async exec() {
    await this.client.user!.setActivity(`${prefix}help`);
    this.client.ready = true;
    console.log(`${this.client.user!.username} launched...`);
  }
}
