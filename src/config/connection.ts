
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../../db/Item/item.schema';

export function CreateConnection(){
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
	sequelize.sync();
	return {itemsModel:Items};
}