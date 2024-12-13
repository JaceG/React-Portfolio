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
				const imageUrl = extractImageUrl(item.content);
				const description = extractDescription(item.content);

				const regexImage = /src="(.+?)"/;
				const authorRegex = /author:\s?(.+?)\<br\/\>/;

				const regexImageMatch = item.content.match(regexImage);
				const regexAuthorMatch = item.content.match(authorRegex);

				let image = '';
				let author = '';

				if (regexImageMatch) {
					image = regexImageMatch[1];
					image = image.replace(/_SX\d+_/, '_SX500_');
				}

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
						image_url: image || '',
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

export async function getFeed(includeHidden: boolean = false) {
	try {
		const whereClause = includeHidden ? {} : { hidden: false };
		const feedItems = await RssFeedItem.findAll({
			where: whereClause,
			order: [['pubDate', 'DESC']],
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

function extractImageUrl(content: string): string | null {
	const match = content.match(/<img.*?src="(.*?)"/);
	return match ? match[1] : null;
}

function extractDescription(content: string): string | null {
	const descriptionMatch = content.match(/author:.*?<br\/>(.*?)<br\/>/);
	if (descriptionMatch && descriptionMatch[1]) {
		return descriptionMatch[1].trim();
	}
	return null;
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
				const imageUrl = extractImageUrl(item.content);
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
