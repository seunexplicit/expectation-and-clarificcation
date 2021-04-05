
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../../db/Item/item.schema';

export async function CreateConnection(){

	let sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
								  host: process.env.DATABASE_HOST,
								  dialect: 'mysql'
								});

	let Items = ItemsModel(sequelize);
	const queryInterface = sequelize.getQueryInterface();
	sequelize.sync()
	.then((pass)=>{})
	.catch((error)=>{});
	return {itemsModel:Items};
}