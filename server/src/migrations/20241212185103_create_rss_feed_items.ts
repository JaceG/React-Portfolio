import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

module.exports = {
	up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
		// Enable the uuid-ossp extension
		await queryInterface.sequelize.query(
			'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
		);

		await queryInterface.createTable('RssFeedItems', {
			id: {
				type: DataTypes.UUID,
				defaultValue: Sequelize.literal('uuid_generate_v4()'),
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			link: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			pubDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		});
	},

	down: async (queryInterface: QueryInterface) => {
		await queryInterface.dropTable('RssFeedItems');
		// Optionally, you can drop the extension if it's no longer needed
		// await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
	},
};
