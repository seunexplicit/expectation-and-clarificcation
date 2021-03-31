import { ItemDataManipulation } from '../../db/Item/item.action';
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../../db/Item/item.schema';

let item:any;
export function databaseConnection(){
	let sequelize = new Sequelize(
		  'mysql', 
		  process.env.DATABASE_USER,
		  process.env.DATABASE_PASSWOD, {
		    host:'localhost',
		    dialect:'mysql',
		    pool:{
		      max:5,
		      min:0,
		      idle:1000
		    }
		  });

	item = ItemsModel(sequelize);
	sequelize.sync()
}

databaseConnection();

process.on('message', (msg)=>{
	if(msg.m==='autodelete'){
		console.log(item, 'item from child process');
		setInterval(()=>{
			new ItemDataManipulation(item).DeleteItem();
		}, 150000);	
	}
});

