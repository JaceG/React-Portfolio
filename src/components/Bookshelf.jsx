import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css'; // Ensure this file is correctly linked

const Bookshelf = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchBooks = async () => {
		const url = 'https://react-portfolio-7z0l.onrender.com/api/books'; // Backend URL
		try {
			setLoading(true); // Start loading
			const response = await axios.get(url); // Fetch XML data from the backend
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
					const highQualityImageUrl = rawImageUrl.replace(
						/_SX\d+_/,
						'_SX500_'
					); // Use high-quality images

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
			setError(null); // Clear any existing errors
		} catch (err) {
			console.error('Error fetching or parsing RSS feed:', err);
			setError('Failed to fetch data. Please try again later.');
		} finally {
			setLoading(false); // End loading state
		}
	};

	useEffect(() => {
		fetchBooks(); // Initial fetch
		const intervalId = setInterval(fetchBooks, 300000); // Refresh every 5 minutes
		return () => clearInterval(intervalId); // Cleanup interval on unmount
	}, []);

	if (loading)
		return (
			<div className='loading'>
				Loading bookshelf... wait roughly 60 seconds for the bookshelf
				page to load to see a list of books I've read relevant to my
				experience.
			</div>
		);
	if (error) return <div className='error'>{error}</div>;

	const featuredBooks = books.slice(0, 2);
	const otherBooks = books.slice(2);

	return (
		<section className='resume-container'>
			<div className='bookshelf-container'>
				<h1 className='bookshelf-title'>My Bookshelf</h1>
				<h2 className='featured-title'>⭐Featured Books⭐</h2>
				<ul className='featured-bookshelf-list'>
					{featuredBooks.map((book, index) => (
						<li
							className='featured-bookshelf-item'
							key={book.title + index}>
							⭐
							<img
								className='featured-bookshelf-image'
								src={
									book.image_url ||
									'https://via.placeholder.com/500'
								}
								alt={book.title || 'No title available'}
							/>
							⭐
							<h2 className='featured-bookshelf-book-title'>
								⭐{book.title}⭐
							</h2>
							<p className='featured-bookshelf-author'>
								<strong>Author:</strong> {book.author_name}
							</p>
							<p className='featured-bookshelf-pub-date'>
								<strong>Published:</strong> {book.pub_date}
							</p>
							<a
								className='featured-bookshelf-link'
								href={book.link}
								target='_blank'
								rel='noopener noreferrer'>
								View on Goodreads
							</a>
						</li>
					))}
				</ul>
				<h2 className='bookshelf-title'>Other Books</h2>
				<ul className='bookshelf-list'>
					{otherBooks.map((book, index) => (
						<li className='bookshelf-item' key={book.title + index}>
							<img
								className='bookshelf-image'
								src={
									book.image_url ||
									'https://via.placeholder.com/500'
								}
								alt={book.title || 'No title available'}
							/>
							<h2 className='bookshelf-book-title'>
								{book.title}
							</h2>
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
		</section>
	);
};

export default Bookshelf;
