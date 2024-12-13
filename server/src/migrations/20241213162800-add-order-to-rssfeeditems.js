'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		function handleError(err) {
			console.error('Migration error:', err);
			throw err;
		}

		function updateOrder() {
			return queryInterface.sequelize.query(
				'WITH ranked AS (SELECT id, ROW_NUMBER() OVER (ORDER BY "pubDate" DESC) - 1 as new_order FROM "RssFeedItems") UPDATE "RssFeedItems" SET "order" = ranked.new_order FROM ranked WHERE "RssFeedItems".id = ranked.id;'
			);
		}

		function addOrderColumn() {
			return queryInterface.addColumn('RssFeedItems', 'order', {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			});
		}

		return queryInterface
			.describeTable('RssFeedItems')
			.then(function (tableInfo) {
				if (!tableInfo.order) {
					return addOrderColumn()
						.then(updateOrder)
						.catch(handleError);
				}
			})
			.catch(handleError);
	},

	down: function (queryInterface) {
		function handleError(err) {
			console.error('Migration error:', err);
			throw err;
		}

		return queryInterface
			.describeTable('RssFeedItems')
			.then(function (tableInfo) {
				if (tableInfo.order) {
					return queryInterface.removeColumn('RssFeedItems', 'order');
				}
			})
			.catch(handleError);
	},
};
