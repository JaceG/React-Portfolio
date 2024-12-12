import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { getFeed, fetchRssFeed, updateBookImage } from './services/rssFeed';
import RssFeedItem from './models/RssFeedItem';
import sequelize from './config/database';
import path from 'path';
import basicAuth from 'express-basic-auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
const allowedOrigins = [
	'http://localhost:5173',
	'http://127.0.0.1:5173',
	'https://react-portfolio-7z0l.onrender.com',
];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				const msg =
					'The CORS policy for this site does not allow access from the specified Origin.';
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
		optionsSuccessStatus: 200,
	})
);

// Security headers middleware
app.use((req, res, next) => {
	res.setHeader(
		'Content-Security-Policy',
		"default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval';"
	);
	next();
});

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Basic Auth Middleware
const adminAuth = basicAuth({
	users: { admin: process.env.ADMIN_PASSWORD || 'changeme' },
	challenge: true,
});

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
	try {
		const feedItems = await getFeed();
		res.json(feedItems);
	} catch (error) {
		console.error('Error fetching books:', error);
		res.status(500).json({ error: 'Failed to fetch books' });
	}
});

// Admin route to update book image
app.put('/api/admin/books/:id', adminAuth, async (req, res) => {
	const { id } = req.params;
	const { image_url } = req.body;

	try {
		const updatedBook = await updateBookImage(id, image_url);
		if (updatedBook) {
			res.json(updatedBook);
		} else {
			res.status(404).json({ error: 'Book not found' });
		}
	} catch (error) {
		console.error('Error updating book image:', error);
		res.status(500).json({ error: 'Failed to update book image' });
	}
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
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
