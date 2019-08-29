import { Listener } from 'discord-akairo';

export default class ClientErrorListener extends Listener {
  constructor() {
    super('client-error', {
      emitter: 'client',
      event: 'error'
    });
  }

  public exec(error: Error) {
    console.error(error);
  }
}
