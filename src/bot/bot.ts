import GopnikClient from './client/GopnikClient';
import GopnikGuild from './extended/GopnikGuild';
import GopnikTextChannel from './extended/GopnikTextChannel';

(async () => {
	await GopnikGuild();
	await GopnikTextChannel();
	const client = new GopnikClient();

	client.start(process.env.DISCORD_TOKEN || client.config.token!);
})();
