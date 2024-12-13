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
	hidden: boolean;
}

const API_URL =
	window.location.hostname === 'localhost' ||
	window.location.hostname === '127.0.0.1'
		? 'http://localhost:3001/api'
		: 'https://react-portfolio-7z0l.onrender.com/api';

const Admin: React.FC = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [fetchingNewBooks, setFetchingNewBooks] = useState<boolean>(false);
	const [newBooksMessage, setNewBooksMessage] = useState<string | null>(null);

	useEffect(() => {
		fetchBooks();
	}, []);

	const fetchBooks = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				`${API_URL}/books?includeHidden=true`
			);
			setBooks(response.data);
			setError(null);
		} catch (err) {
			console.error('Error fetching books:', err);
			setError('Failed to fetch books. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		setAuthenticated(true);
	};

	const handleUpdateImage = async (id: string, newImageUrl: string) => {
		try {
			const response = await axios.put(
				`${API_URL}/admin/books/${id}`,
				{ image_url: newImageUrl },
				{
					auth: {
						username,
						password,
					},
				}
			);
			const updatedBook = response.data;
			setBooks(
				books.map((book) =>
					book.id === updatedBook.id ? updatedBook : book
				)
			);
		} catch (err) {
			console.error('Error updating book image:', err);
			setError('Failed to update book image. Please try again.');
		}
	};

	const handleFetchNewBooks = async () => {
		try {
			setFetchingNewBooks(true);
			setNewBooksMessage(null);
			const response = await axios.post(
				`${API_URL}/admin/fetch-new-books`,
				{},
				{
					auth: {
						username,
						password,
					},
				}
			);
			setNewBooksMessage(response.data.message);
			fetchBooks();
		} catch (err) {
			console.error('Error fetching new books:', err);
			setNewBooksMessage('Failed to fetch new books. Please try again.');
		} finally {
			setFetchingNewBooks(false);
		}
	};

	const handleToggleHidden = async (id: string) => {
		try {
			const response = await axios.put(
				`${API_URL}/admin/books/${id}/toggle-hidden`,
				{},
				{
					auth: {
						username,
						password,
					},
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				}
			);

			if (response.data) {
				setBooks((prevBooks) =>
					prevBooks.map((book) =>
						book.id === id
							? { ...book, hidden: !book.hidden }
							: book
					)
				);
			}
		} catch (err) {
			console.error('Error toggling book hidden status:', err);
			if (axios.isAxiosError(err) && err.response?.status === 401) {
				setError(
					'Authentication failed. Please check your credentials.'
				);
			} else {
				setError(
					'Failed to toggle book hidden status. Please try again.'
				);
			}
		}
	};

	if (loading) {
		return (
			<section className='resume-container'>
				<div className='loading'>Loading...</div>
			</section>
		);
	}

	if (!authenticated) {
		return (
			<section className='resume-container'>
				<Title title='Admin Login' />
				<form onSubmit={handleLogin} className='contact-form'>
					<div className='form-group'>
						<label htmlFor='username' className='form-label'>
							Username:
						</label>
						<input
							type='text'
							id='username'
							className='form-input'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password' className='form-label'>
							Password:
						</label>
						<input
							type='password'
							id='password'
							className='form-input'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button type='submit' className='submit-button'>
						Login
					</button>
				</form>
			</section>
		);
	}

	return (
		<section className='resume-container'>
			<Title title='Admin - Edit Book Images' />
			{error && <div className='error-message'>{error}</div>}
			<div className='mb-4'>
				<button
					onClick={handleFetchNewBooks}
					disabled={fetchingNewBooks}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>
					{fetchingNewBooks ? 'Fetching...' : 'Fetch New Books'}
				</button>
				{newBooksMessage && (
					<p className='mt-2 text-green-600'>{newBooksMessage}</p>
				)}
			</div>
			<div className='books-grid'>
				{books.map((book) => (
					<div key={book.id} className='book-item'>
						<h3 className='book-title'>{book.title}</h3>
						<img
							src={
								book.image_url ||
								'https://via.placeholder.com/200x300'
							}
							alt={book.title}
							className='book-image'
						/>
						<input
							type='text'
							className='form-input'
							defaultValue={book.image_url}
							onBlur={(e) =>
								handleUpdateImage(book.id, e.target.value)
							}
						/>
						<button
							onClick={() => handleToggleHidden(book.id)}
							className={`mt-2 px-4 py-2 rounded ${
								book.hidden
									? 'bg-green-500 hover:bg-green-700'
									: 'bg-red-500 hover:bg-red-700'
							} text-white font-bold`}>
							{book.hidden ? 'Unhide' : 'Hide'}
						</button>
					</div>
				))}
			</div>
		</section>
	);
};

export default Admin;
