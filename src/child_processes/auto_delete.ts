import { ItemDataManipulation } from '../../db/Item/item.action';
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../../db/Item/item.schema';
import { CreateConnection } from '../config/connection';

const item:any = CreateConnection().ItemsModel;

process.on('message', (msg)=>{
	if(msg.m==='autodelete'){
		console.log(item, 'item from child process');
		setInterval(()=>{
			new ItemDataManipulation(item).DeleteItem();
		}, 150000);	
	}
});

