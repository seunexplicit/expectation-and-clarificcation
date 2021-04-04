
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../../db/Item/item.schema';

export async function CreateConnection(){

	let sequelize = new Sequelize(
		  'mysql', 
		  process.env.DATABASE_USER,
		  process.env.DATABASE_PASWORD, {
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
	// queryInterface.removeColumn('Items', 'validityDate');
	sequelize.sync()
	.then((pass)=>{})
	.catch((error)=>{console.log(error, 'error')});
	return {itemsModel:Items};
}