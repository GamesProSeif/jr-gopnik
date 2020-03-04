import GopnikClient from './client/GopnikClient';
import GopnikTextChannel from './extended/GopnikTextChannel';

(async () => {
	await GopnikTextChannel();
	const client = new GopnikClient();

	client.start(process.env.DISCORD_TOKEN!);
})();
