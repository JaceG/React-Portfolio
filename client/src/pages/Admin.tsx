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

const Admin: React.FC = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [authenticated, setAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		fetchBooks();
	}, []);

	const fetchBooks = async () => {
		try {
			setLoading(true);
			const response = await axios.get('http://localhost:3001/api/books');
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
				`http://localhost:3001/api/admin/books/${id}`,
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

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!authenticated) {
		return (
			<div>
				<h2>Admin Login</h2>
				<form onSubmit={handleLogin}>
					<input
						type='text'
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type='submit'>Login</button>
				</form>
			</div>
		);
	}

	return (
		<div>
			<Title title='Admin - Edit Book Images' />
			{books.map((book) => (
				<div key={book.id}>
					<h3>{book.title}</h3>
					<img
						src={book.image_url}
						alt={book.title}
						style={{ width: '100px' }}
					/>
					<input
						type='text'
						defaultValue={book.image_url}
						onBlur={(e) =>
							handleUpdateImage(book.id, e.target.value)
						}
					/>
				</div>
			))}
		</div>
	);
};

export default Admin;
