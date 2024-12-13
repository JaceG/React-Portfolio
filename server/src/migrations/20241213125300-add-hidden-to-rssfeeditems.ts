import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
	up: async (queryInterface: QueryInterface) => {
		// Check if the column exists
		const tableInfo = await queryInterface.describeTable('RssFeedItems');
		if (!tableInfo.hidden) {
			await queryInterface.addColumn('RssFeedItems', 'hidden', {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			});
		}
	},

	down: async (queryInterface: QueryInterface) => {
		// Check if the column exists before trying to remove it
		const tableInfo = await queryInterface.describeTable('RssFeedItems');
		if (tableInfo.hidden) {
			await queryInterface.removeColumn('RssFeedItems', 'hidden');
		}
	},
};
