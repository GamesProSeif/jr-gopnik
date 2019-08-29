import { Collection, Guild, Snowflake, Structures } from 'discord.js';
import { ISnipe } from '../../typings';

export default async () => {
  return Structures.extend('TextChannel', TextChannel => {
    class GopnikTextChannel extends TextChannel {
      public snipe: Collection<Snowflake, ISnipe>;

      constructor(guild: Guild, data: any) {
        super(guild, data);
        this.snipe = new Collection();
      }
    }

    return GopnikTextChannel;
  });
};
