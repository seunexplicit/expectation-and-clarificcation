
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../../db/Item/item.schema';

export async function CreateConnection(){

	let sequelize = new Sequelize(
		  'mysql', 
		  process.env.DATABASE_USER,
		  process.env.DATABASE_PASSWORD, {
		    host:'localhost',
		    dialect:'mysql',
		    pool:{
		      max:5,
		      min:0,
		      idle:1000
		    }
		 });

	let Items = ItemsModel(sequelize);
	const queryInterface = sequelize.getQueryInterface();
	sequelize.sync()
	.then((pass)=>{})
	.catch((error)=>{});
	return {itemsModel:Items};
}