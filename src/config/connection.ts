
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../../db/Item/item.schema';

export async function CreateConnection(){

	let sequelize = new Sequelize('h032ac6z0fz3nixy','u9lo9b0ys8q7acji', 't8pe14tkw4li32tj', {
								  host: "eyw6324oty5fsovx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
								  port:3306,
								  dialect: 'mysql'
								});

	let Items = ItemsModel(sequelize);
	const queryInterface = sequelize.getQueryInterface();
	sequelize.sync()
	.then((pass)=>{})
	.catch((error)=>{});
	return {itemsModel:Items};
}