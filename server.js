import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors()); // Allow CORS

// Route to fetch books from Goodreads
app.get('/api/books', async (req, res) => {
	try {
		const response = await axios.get(
			'https://www.goodreads.com/review/list_rss/72594950?key=k8BP10mge61MZ_dQViUb3Dw2bqP9p961Wj4AMP5pE5JZSDha&shelf=ai'
		);
		res.send(response.data); // Send the raw RSS data back to the client
	} catch (error) {
		console.error('Error fetching books:', error);
		res.status(500).send('Error fetching books from Goodreads');
	}
});

// Route to proxy image requests
app.get('/api/image', async (req, res) => {
	const imageUrl = req.query.url; // Get the image URL from the query parameter
	try {
		const response = await axios.get(imageUrl, {
			responseType: 'arraybuffer',
		}); // Fetch image as binary data
		res.set('Content-Type', response.headers['content-type']); // Forward the correct content type
		res.send(response.data); // Send the image data
	} catch (error) {
		console.error('Error fetching image:', error);
		res.status(500).send('Error fetching image');
	}
});

const PORT = 5005; // Port number
app.listen(PORT, () => {
	console.log(`Proxy server running at http://localhost:${PORT}`);
});
