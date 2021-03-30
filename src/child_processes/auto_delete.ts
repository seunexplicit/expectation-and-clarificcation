import ItemDataManipulation from '../../db/Item/item.action';

process.on('message', (m, sequelize)=>{
	if(m==='autodelete'){
		setInterval(()=>{
			new ItemDataManipulation(sequelize).DeleteItem();
		}, 900000);	
	}
});

