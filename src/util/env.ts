import { config } from 'dotenv';
import { join } from 'path';

try {
	config({ path: join(process.cwd(), '.env') });
} catch {}
