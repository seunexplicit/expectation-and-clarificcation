import { ItemDataManipulation } from '../../db/Item/item.action';
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../../db/Item/item.schema';
import { CreateConnection } from '../config/connection';

process.on('message', async (msg)=>{
	const item:any = await CreateConnection();
	if(msg.m==='autodelete'){
		setInterval(()=>{
			new ItemDataManipulation(item.ItemsModel).DeleteItem();
		}, 20000);	
	}
});

