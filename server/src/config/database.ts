import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
	dialect: 'postgres',
	logging: false, // set to console.log to see the raw SQL queries
	dialectOptions: {
		// Remove SSL configuration as it's a local database
	},
});

export default sequelize;
