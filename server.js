import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

// Configure CORS to allow requests from your Netlify site
app.use(
	cors({
		origin: 'https://thunderous-tapioca-0a8ebe.netlify.app', // Your Netlify frontend URL
	})
);

// Route to fetch books from Goodreads
app.get('/api/books', async (req, res) => {
	try {
		const response = await axios.get(
			'https://www.goodreads.com/review/list_rss/72594950?key=k8BP10mge61MZ_dQViUb3Dw2bqP9p961Wj4AMP5pE5JZSDha&shelf=ai'
		);
		res.set('Content-Type', 'application/xml');
		res.send(response.data);
	} catch (error) {
		console.error('Error fetching data from Goodreads:', error);
		res.status(500).send('Error fetching data from Goodreads');
	}
});

// Start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
