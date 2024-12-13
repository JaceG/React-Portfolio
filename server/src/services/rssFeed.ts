import Parser from 'rss-parser';
import RssFeedItem from '../models/RssFeedItem';

const parser = new Parser({
	customFields: {
		item: [
			['content', 'content'],
			['author', 'creator'],
		],
	},
});

export async function fetchRssFeed() {
	try {
		const feed = await parser.parseURL(process.env.RSS_FEED_URL || '');

		for (const item of feed.items) {
			try {
				const imageUrl = extractHighResImageUrl(item.content);
				const description = extractDescription(item.content);

				const authorRegex = /author:\s?(.+?)\<br\/\>/;
				const regexAuthorMatch = item.content.match(authorRegex);

				let author = '';

				if (regexAuthorMatch) {
					author = regexAuthorMatch[1];
				}

				await RssFeedItem.findOrCreate({
					where: { link: item.link },
					defaults: {
						title: item.title || '',
						description: description || item.contentSnippet || '',
						link: item.link || '',
						pubDate: new Date(item.pubDate || Date.now()),
						image_url: imageUrl || '',
						author: author || '',
					},
				});
			} catch (error) {
				console.error(
					`Error processing feed item: ${item.link}`,
					error
				);
			}
		}

		console.log('RSS feed fetched and stored successfully');
	} catch (error) {
		console.error('Error fetching RSS feed:', error);
	}
}

function extractHighResImageUrl(content: string): string {
	const match = content.match(/<img.*?src="(.*?)"/);
	if (match && match[1]) {
		let highResUrl = match[1];

		// Remove any existing size constraints
		highResUrl = highResUrl.replace(
			/._SX\d+_|._SY\d+_|._CR\d+,\d+,\d+,\d+_/,
			''
		);

		// Check if the URL is from Goodreads
		if (highResUrl.includes('goodreads.com')) {
			// For Goodreads URLs, use a larger size
			highResUrl = highResUrl.replace(
				/\.(jpg|jpeg|png|gif)$/,
				'._SX1000_.$1'
			);
		} else {
			// For other URLs, try to increase the size if a parameter exists
			highResUrl = highResUrl.replace(
				/\b(width|height|size)=\d+\b/g,
				'$1=1000'
			);
		}

		// Ensure the URL ends with a valid image extension
		if (!/\.(jpg|jpeg|png|gif)$/i.test(highResUrl)) {
			highResUrl += '.jpg';
		}

		return highResUrl;
	}
	return 'https://via.placeholder.com/1000x1500'; // Fallback image URL
}

function extractDescription(content: string): string | null {
	const descriptionMatch = content.match(/author:.*?<br\/>(.*?)<br\/>/);
	if (descriptionMatch && descriptionMatch[1]) {
		return descriptionMatch[1].trim();
	}
	return null;
}

export async function getFeed(includeHidden: boolean = false) {
	try {
		const whereClause = includeHidden ? {} : { hidden: false };
		const feedItems = await RssFeedItem.findAll({
			where: whereClause,
			order: [['order', 'ASC']],
			limit: 200,
		});
		return feedItems;
	} catch (error) {
		console.error('Error fetching RSS feed items:', error);
		return [];
	}
}

export async function updateBookImage(id: string, image_url: string) {
	try {
		const book = await RssFeedItem.findByPk(id);
		if (book) {
			book.image_url = image_url;
			await book.save();
			return book;
		}
		return null;
	} catch (error) {
		console.error('Error updating book image:', error);
		throw error;
	}
}

export async function fetchNewBooks() {
	try {
		const feed = await parser.parseURL(process.env.RSS_FEED_URL || '');
		const newBooks = [];

		for (const item of feed.items) {
			const existingBook = await RssFeedItem.findOne({
				where: { link: item.link },
			});
			if (!existingBook) {
				const imageUrl = extractHighResImageUrl(item.content);
				const description = extractDescription(item.content);
				const authorMatch = item.content.match(
					/author:\s?(.+?)\<br\/\>/
				);
				const author = authorMatch ? authorMatch[1] : '';

				const newBook = await RssFeedItem.create({
					title: item.title || '',
					description: description || item.contentSnippet || '',
					link: item.link || '',
					pubDate: new Date(item.pubDate || Date.now()),
					image_url: imageUrl || '',
					author: author || '',
				});

				newBooks.push(newBook);
			}
		}

		console.log(`${newBooks.length} new books added to the database`);
		return newBooks;
	} catch (error) {
		console.error('Error fetching new books:', error);
		throw error;
	}
}

export async function toggleBookHidden(id: string) {
	try {
		const book = await RssFeedItem.findByPk(id);
		if (!book) {
			console.error(`Book with id ${id} not found`);
			return null;
		}

		book.hidden = !book.hidden;
		const savedBook = await book.save();
		console.log(
			`Successfully toggled hidden status for book ${id} to ${book.hidden}`
		);
		return savedBook;
	} catch (error) {
		console.error('Error toggling book hidden status:', error);
		throw error;
	}
}

export async function updateBookOrder(books: { id: string; order: number }[]) {
	try {
		const uuidRegex =
			/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		const validBooks = books.every(
			(book) =>
				book &&
				typeof book.id === 'string' &&
				uuidRegex.test(book.id) &&
				typeof book.order === 'number'
		);

		if (!validBooks) {
			throw new Error(
				'Invalid book data. Each book must have a valid UUID and order number.'
			);
		}

		await Promise.all(
			books.map((book) =>
				RssFeedItem.update(
					{ order: book.order },
					{ where: { id: book.id } }
				)
			)
		);

		return await RssFeedItem.findAll({
			order: [['order', 'ASC']],
		});
	} catch (error) {
		console.error('Error updating book order:', error);
		throw error;
	}
}

export async function refetchAllBooks() {
	try {
		const feed = await parser.parseURL(process.env.RSS_FEED_URL || '');
		const updatedBooks = [];

		for (const item of feed.items) {
			const imageUrl = extractHighResImageUrl(item.content);
			const description = extractDescription(item.content);
			const authorMatch = item.content.match(/author:\s?(.+?)\<br\/\>/);
			const author = authorMatch ? authorMatch[1] : '';

			const [book, created] = await RssFeedItem.findOrCreate({
				where: { link: item.link },
				defaults: {
					title: item.title || '',
					description: description || item.contentSnippet || '',
					link: item.link || '',
					pubDate: new Date(item.pubDate || Date.now()),
					image_url: imageUrl,
					author: author || '',
				},
			});

			if (!created) {
				// Update existing book
				book.title = item.title || '';
				book.description = description || item.contentSnippet || '';
				book.pubDate = new Date(item.pubDate || Date.now());
				book.image_url = imageUrl;
				book.author = author || '';
				await book.save();
			}

			updatedBooks.push(book);
		}

		console.log(
			`${updatedBooks.length} books updated or added to the database`
		);
		return updatedBooks;
	} catch (error) {
		console.error('Error refetching all books:', error);
		throw error;
	}
}
