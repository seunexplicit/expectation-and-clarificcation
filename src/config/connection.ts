
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../../db/Item/item.schema';

export async function CreateConnection(){

	let sequelize = new Sequelize(process.env.CONNECTION_STRING);

	let Items = ItemsModel(sequelize);
	const queryInterface = sequelize.getQueryInterface();
	sequelize.sync()
	.then((pass)=>{})
	.catch((error)=>{});
	return {itemsModel:Items};
}