import { Listener } from 'discord-akairo';

export default class ShardResumedListener extends Listener {
  constructor() {
    super('shardResumed', {
      emitter: 'client',
      event: 'shardResumed'
    });
  }

  public exec() {
    console.log('Connected successfully');
    this.client.ready = true;
  }
}
