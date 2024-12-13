'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return new Promise(function (resolve, reject) {
			queryInterface
				.describeTable('RssFeedItems')
				.then(function (tableInfo) {
					if (!tableInfo.order) {
						queryInterface
							.addColumn('RssFeedItems', 'order', {
								type: Sequelize.INTEGER,
								allowNull: false,
								defaultValue: 0,
							})
							.then(function () {
								queryInterface.sequelize
									.query(
										`
                WITH ranked AS (
                  SELECT id, ROW_NUMBER() OVER (ORDER BY "pubDate" DESC) - 1 as new_order
                  FROM "RssFeedItems"
                )
                UPDATE "RssFeedItems"
                SET "order" = ranked.new_order
                FROM ranked
                WHERE "RssFeedItems".id = ranked.id;
              `
									)
									.then(resolve)
									.catch(reject);
							})
							.catch(reject);
					} else {
						resolve();
					}
				})
				.catch(reject);
		});
	},

	down: function (queryInterface, Sequelize) {
		return new Promise(function (resolve, reject) {
			queryInterface
				.describeTable('RssFeedItems')
				.then(function (tableInfo) {
					if (tableInfo.order) {
						queryInterface
							.removeColumn('RssFeedItems', 'order')
							.then(resolve)
							.catch(reject);
					} else {
						resolve();
					}
				})
				.catch(reject);
		});
	},
};
