import { Listener } from 'discord-akairo';

export default class ShardReconnectingListener extends Listener {
  constructor() {
    super('shardReconnecting', {
      emitter: 'client',
      event: 'shardReconnecting'
    });
  }

  public exec() {
    console.log('Attempting to reconnect');
  }
}
