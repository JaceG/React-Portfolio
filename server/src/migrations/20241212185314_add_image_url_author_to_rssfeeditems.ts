import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.addColumn('RssFeedItems', 'image_url', {
			type: DataTypes.STRING,
			allowNull: true,
		});

		await queryInterface.addColumn('RssFeedItems', 'author', {
			type: DataTypes.STRING,
			allowNull: true,
		});
	},

	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.removeColumn('RssFeedItems', 'image_url');
		await queryInterface.removeColumn('RssFeedItems', 'author');
	},
};