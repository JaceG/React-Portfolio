'use strict';

import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

module.exports = {
	async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		const tableInfo = await queryInterface.describeTable('RssFeedItems');
		if (!tableInfo.order) {
			await queryInterface.addColumn('RssFeedItems', 'order', {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			});

			await queryInterface.sequelize.query(`
        WITH ranked AS (
          SELECT id, ROW_NUMBER() OVER (ORDER BY "pubDate" DESC) - 1 as new_order
          FROM "RssFeedItems"
        )
        UPDATE "RssFeedItems"
        SET "order" = ranked.new_order
        FROM ranked
        WHERE "RssFeedItems".id = ranked.id;
      `);
		}
	},

	async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
		const tableInfo = await queryInterface.describeTable('RssFeedItems');
		if (tableInfo.order) {
			await queryInterface.removeColumn('RssFeedItems', 'order');
		}
	},
};
