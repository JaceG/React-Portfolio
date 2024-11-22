import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css'; // Assuming your CSS file is named style.css

const Bookshelf = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchBooks = async () => {
		const url = 'http://localhost:5005/api/books'; // Backend proxy for fetching book data

		try {
			setLoading(true); // Start loading
			const response = await axios.get(url); // Fetch XML data from the backend

			// Parse XML using DOMParser
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(
				response.data,
				'application/xml'
			);

			// Extract items from the parsed XML
			const items = Array.from(xmlDoc.getElementsByTagName('item')).map(
				(item) => {
					const rawImageUrl =
						item.getElementsByTagName('book_image_url')[0]
							?.textContent || '';

					// Replace small image suffix with the largest size available
					const highQualityImageUrl = rawImageUrl.replace(
						/_SX\d+_/,
						'_SX500_'
					);

					return {
						title:
							item.getElementsByTagName('title')[0]
								?.textContent || 'Unknown Title',
						author_name:
							item.getElementsByTagName('author_name')[0]
								?.textContent || 'Unknown Author',
						pub_date:
							item.getElementsByTagName('pub_date')[0]
								?.textContent || 'N/A',
						link:
							item.getElementsByTagName('link')[0]?.textContent ||
							'#',
						image_url: highQualityImageUrl || '',
					};
				}
			);

			setBooks(items); // Update state with parsed books
		} catch (err) {
			console.error('Error fetching or parsing RSS feed:', err);
			setError('Failed to fetch data. Please try again later.'); // Set error message
		} finally {
			setLoading(false); // End loading state
		}
	};

	useEffect(() => {
		// Fetch books on component mount
		fetchBooks();

		// Set up a 5-minute interval to fetch books
		const interval = setInterval(fetchBooks, 300000);

		// Clear the interval on component unmount
		return () => clearInterval(interval);
	}, []);

	if (loading)
		return <div className='loading'>Loading your bookshelf...</div>;
	if (error) return <div className='error'>{error}</div>;

	return (
		<div className='bookshelf-container'>
			<h1 className='bookshelf-title'>My Bookshelf</h1>
			<ul className='bookshelf-list'>
				{books.map((book, index) => (
					<li className='bookshelf-item' key={book.title + index}>
						<img
							className='bookshelf-image'
							src={
								book.image_url ||
								'https://via.placeholder.com/500'
							}
							alt={book.title || 'No title available'}
						/>
						<h2 className='bookshelf-book-title'>{book.title}</h2>
						<p className='bookshelf-author'>
							<strong>Author:</strong> {book.author_name}
						</p>
						<p className='bookshelf-pub-date'>
							<strong>Published:</strong> {book.pub_date}
						</p>
						<a
							className='bookshelf-link'
							href={book.link}
							target='_blank'
							rel='noopener noreferrer'>
							View on Goodreads
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Bookshelf;
