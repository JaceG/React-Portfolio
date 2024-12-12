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

				// Regex to match the src attribute
				const regexImage = /src="(.+?)"/;
				const authorRegex = /author:\s?(.+?)\<br\/\>/;

				// Use the match method to extract the value
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

export async function getFeed() {
	try {
		const feedItems = await RssFeedItem.findAll({
			order: [['pubDate', 'DESC']],
			limit: 200,
		});
		return feedItems;
	} catch (error) {
		console.error('Error fetching RSS feed items:', error);
		return [];
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
