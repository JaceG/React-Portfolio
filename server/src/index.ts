import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { getFeed, fetchRssFeed } from './services/rssFeed';
import RssFeedItem from './models/RssFeedItem';
import sequelize from './config/database';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
app.use(
	cors({
		origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
		optionsSuccessStatus: 200,
	})
);

app.use(express.json());

// Configure Umzug for migrations
const umzug = new Umzug({
	migrations: {
		glob: 'src/migrations/*.ts',
		resolve: ({ name, path: migrationPath, context }) => {
			if (typeof migrationPath !== 'string') {
				throw new Error(`Invalid migration path: ${migrationPath}`);
			}
			const migration = require(path.resolve(__dirname, migrationPath));
			return {
				name,
				up: async () => migration.up(context, Sequelize),
				down: async () => migration.down(context, Sequelize),
			};
		},
	},
	context: sequelize.getQueryInterface(),
	storage: new SequelizeStorage({ sequelize }),
	logger: console,
});

// API Routes
app.get('/api/books', async (req, res) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
	res.header('Access-Control-Allow-Credentials', 'true');

	try {
		const feedItems = await getFeed();
		res.json(feedItems);
	} catch (error) {
		console.error('Error fetching books:', error);
		res.status(500).json({ error: 'Failed to fetch books' });
	}
});

async function startServer() {
	try {
		await sequelize.authenticate();
		console.log('Database connection has been established successfully.');

		console.log('Running migrations...');
		await umzug.up();
		console.log('Migrations completed successfully.');

		console.log('Syncing models...');
		await sequelize.sync({ alter: true });
		console.log('Models synchronized successfully.');

		await fetchRssFeed();
		setInterval(fetchRssFeed, 6 * 60 * 60 * 1000);

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Unable to start server:', error);
		if (error instanceof Error) {
			console.error(error.stack);
		}
		process.exit(1);
	}
}

startServer();

process.on('SIGINT', async () => {
	await sequelize.close();
	process.exit(0);
});
