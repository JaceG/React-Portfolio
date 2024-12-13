'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface
			.describeTable('RssFeedItems')
			.then(function (tableInfo) {
				if (!tableInfo.order) {
					return queryInterface
						.addColumn('RssFeedItems', 'order', {
							type: Sequelize.INTEGER,
							allowNull: false,
							defaultValue: 0,
						})
						.then(function () {
							return queryInterface.sequelize.query(`
              WITH ranked AS (
                SELECT id, ROW_NUMBER() OVER (ORDER BY "pubDate" DESC) - 1 as new_order
                FROM "RssFeedItems"
              )
              UPDATE "RssFeedItems"
              SET "order" = ranked.new_order
              FROM ranked
              WHERE "RssFeedItems".id = ranked.id;
            `);
						});
				}
				return Promise.resolve();
			});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface
			.describeTable('RssFeedItems')
			.then(function (tableInfo) {
				if (tableInfo.order) {
					return queryInterface.removeColumn('RssFeedItems', 'order');
				}
				return Promise.resolve();
			});
	},
};
