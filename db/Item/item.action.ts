import { Op } from 'sequelize';
import DuplicateItem from '../../lib/duplicateVar';
import filterItem  from '../../lib/filterItem';
import { SellItem as ST, GetItem as GI, AddItem as AI} from '../../models/ItemModel';

export default class ItemDataManipulation{
	itemModel:any;
	 constructor(private ItemModel:any){
	 	this.itemModel = ItemModel
	 }

	 DeleteItem():void{
	 	this.itemModel.destroy({
			where:{
				validityDate:{
					[Op.lt]:new Date()
				}
			}
		});
	 }

	async SellItem(value:ST, itemname:string):Promise<any>{
		
		let itemValidCount = await this.itemModel.count({
								where:{
									name:itemname, 
									validityDate:{
										[Op.gt]:new Date()
									}
								}
							});

		if(itemValidCount>=value.quantity){
			let destroyedItem =  await this.itemModel.destroy({
				where:{
					name:itemname, 
					validityDate:{
						[Op.gt]:new Date()
					}, 
				},
				limit:value.quantity
			}); 

			return {};
			
		}
			return {};
		
	}


	async AddItem(items:AI, itemname:string):Promise<any>{
		try{
			let all_item = DuplicateItem(items, itemname);
			return this.itemModel.bulkCreate(all_item);
		}
		catch(err){ throw err }
	}

	async GetItems(itemname:string):Promise<GI>{

		let items  = await this.itemModel.findAll({ 
						raw:true,
						where:{
							name:itemname,
							validityDate:{
								[Op.gt]:new Date()
							}
						}
					});
		console.log(itemname, 'items name from item.action', items);
		let filteredItem = filterItem(items);

		if(filteredItem.filterItems.length){
			return { 
				quantity:filteredItem.filterItems.length,
				validTill:filteredItem.filterItems[filteredItem.timeIndex].validityDate.getTime() 
			}
		}
		else{
			return{ quantity:0, validTill:null }
		}
	}
}

