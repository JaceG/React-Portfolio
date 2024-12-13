import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { getFeed, fetchRssFeed, updateBookImage } from './services/rssFeed';
import sequelize from './config/database';
import path from 'path';
import basicAuth from 'express-basic-auth';
import * as postmark from 'postmark';

dotenv.config();

// Log Postmark configuration (without exposing sensitive data)
console.log('Postmark configuration loaded:', {
	hasApiKey: !!process.env.POSTMARK_API_KEY,
	fromEmail: process.env.POSTMARK_FROM_EMAIL,
	toEmail: process.env.POSTMARK_TO_EMAIL,
});

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
const allowedOrigins = [
	'http://localhost:5173',
	'http://127.0.0.1:5173',
	'https://react-portfolio-7z0l.onrender.com',
	'https://react-portfolio-7z0l.onrender.com/',
	'https://www.hirejace.com',
	'https://hirejace.com',
];

app.use(
	cors({
		origin: allowedOrigins,
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
		"default-src 'self'; connect-src 'self' https://react-portfolio-7z0l.onrender.com https://react-portfolio-7z0l.onrender.com/api/* http://localhost:3001 http://localhost:3001/api/* https://www.hirejace.com https://hirejace.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: http:; script-src 'self' 'unsafe-inline' 'unsafe-eval';"
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

// Create Postmark client
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY || '');

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

// Contact form email sending route
app.post('/api/contact', async (req, res) => {
	const { name, email, message } = req.body;

	try {
		console.log('Received contact form submission:', {
			name,
			email,
			message,
		});

		// Use the verified domain email addresses
		const fromEmail = 'jace@talkwithjace.com'; // or any verified email on your domain
		const toEmail = 'jace@talkwithjace.com'; // or any other email on your domain

		// Send email using Postmark
		const response = await client.sendEmail({
			From: fromEmail,
			To: toEmail,
			Subject: 'New Contact Form Submission',
			TextBody: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
			HtmlBody: `<p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Message:</strong> ${message}</p>`,
		});

		console.log('Postmark response:', response);
		res.status(200).json({ message: 'Email sent successfully' });
	} catch (error) {
		console.error('Error sending email:', error);
		res.status(500).json({
			error: 'Failed to send email',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
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
