import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class RssFeedItem extends Model {
	public id!: string;
	public title!: string;
	public description!: string | null;
	public link!: string;
	public pubDate!: Date;
	public image_url!: string | null;
	public author!: string | null;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

RssFeedItem.init(
	{
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
		image_url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		author: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: 'RssFeedItem',
		tableName: 'RssFeedItems',
	}
);

export default RssFeedItem;
