declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			NODE_ENV: 'development' | 'production';
			PORT: string;
			RSS_FEED_URL: string;
		}
	}
}

export {};
