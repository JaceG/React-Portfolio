'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		try {
			console.log('Starting migration: add-order-to-rssfeeditems');

			const tableInfo = await queryInterface.describeTable(
				'RssFeedItems'
			);
			console.log(
				'Current table structure:',
				JSON.stringify(tableInfo, null, 2)
			);

			if (!tableInfo.order) {
				console.log('Adding order column...');

				await queryInterface.addColumn('RssFeedItems', 'order', {
					type: Sequelize.INTEGER,
					allowNull: false,
					defaultValue: 0,
				});

				console.log('Setting initial order values...');
				const updateResult = await queryInterface.sequelize.query(`
          WITH ranked AS (
            SELECT id, ROW_NUMBER() OVER (ORDER BY "pubDate" DESC) - 1 as new_order
            FROM "RssFeedItems"
          )
          UPDATE "RssFeedItems"
          SET "order" = ranked.new_order
          FROM ranked
          WHERE "RssFeedItems".id = ranked.id;
        `);
				console.log(
					'Update result:',
					JSON.stringify(updateResult, null, 2)
				);

				console.log('Migration completed successfully');
			} else {
				console.log('Order column already exists, skipping migration');
			}
		} catch (error) {
			console.error('Migration failed:', error);
			throw error;
		}
	},

	async down(queryInterface, Sequelize) {
		try {
			console.log('Starting rollback: add-order-to-rssfeeditems');

			const tableInfo = await queryInterface.describeTable(
				'RssFeedItems'
			);
			console.log(
				'Current table structure:',
				JSON.stringify(tableInfo, null, 2)
			);

			if (tableInfo.order) {
				console.log('Removing order column...');
				await queryInterface.removeColumn('RssFeedItems', 'order');
				console.log('Rollback completed successfully');
			} else {
				console.log('Order column does not exist, skipping rollback');
			}
		} catch (error) {
			console.error('Rollback failed:', error);
			throw error;
		}
	},
};
