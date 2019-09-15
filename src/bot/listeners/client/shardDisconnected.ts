import { Listener } from 'discord-akairo';
import { CloseEvent } from 'ws';

export default class ShardDisconnectedListener extends Listener {
  constructor() {
    super('shardDisconnected', {
      emitter: 'client',
      event: 'shardDisconnected',
      category: 'client'
    });
  }

  public exec(event: CloseEvent) {
    console.log(`Disconnected from websocket (Status: ${event.code})`);
    this.client.ready = false;
  }
}
