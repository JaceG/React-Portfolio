import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from '../components/Title';

interface Book {
	id: string;
	title: string;
	author: string;
	pubDate: string;
	link: string;
	image_url: string;
	description: string;
}

// Dynamic API URL based on the current hostname
const API_URL =
	window.location.hostname === 'localhost' ||
	window.location.hostname === '127.0.0.1'
		? 'http://localhost:3001/api'
		: 'https://react-portfolio-7z0l.onrender.com/api';

const Books: React.FC = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${API_URL}/books`, {
					headers: {
						'Content-Type': 'application/json',
					},
				});

				setBooks(response.data);
				setError(null);
			} catch (err) {
				console.error('Error fetching books:', err);
				setError('Failed to fetch books. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, []);

	if (loading) {
		return (
			<section className='resume-container'>
				<div className='bookshelf-container'>
					<Title title='My Bookshelf' />
					<div className='loading'>Loading books...</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className='resume-container'>
				<div className='bookshelf-container'>
					<Title title='My Bookshelf' />
					<div className='error'>{error}</div>
				</div>
			</section>
		);
	}

	return (
		<section className='resume-container'>
			<div className='bookshelf-container'>
				<Title title='My Bookshelf' />
				<div className='books-grid'>
					{books.map((book) => (
						<div key={book.id} className='book-item'>
							<img
								src={
									book.image_url ||
									'https://via.placeholder.com/200x300'
								}
								alt={book.title}
								className='book-image'
							/>
							<h3 className='book-title'>{book.title}</h3>
							<p className='book-author'>By {book.author}</p>
							<p className='book-date'>
								Published:{' '}
								{new Date(book.pubDate).toLocaleDateString()}
							</p>
							<a
								href={book.link}
								target='_blank'
								rel='noopener noreferrer'
								className='book-link'>
								View on Goodreads
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Books;
