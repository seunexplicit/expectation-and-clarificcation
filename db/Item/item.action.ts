import { Op } from 'sequelize';
import DuplicateItem from '../../lib/duplicateVar';
import filterItem  from '../../lib/filterItem';
import { SellItem as ST, GetItem as GI, AddItem as AI} from '../../models/ItemModel';

export class ItemDataManipulation{
	itemModel:any;
	 constructor(ItemModel:any){
	 	this.itemModel = ItemModel
	 }

	 DeleteItem():void{
	 	this.itemModel.destroy({
			where:{
				validTill:{
					[Op.lt]:new Date().getTime()
				}
			}
		});
	 }

	async SellItem(value:ST, itemname:string):Promise<any>{
		let itemValidCount = await this.itemModel.count({
								where:{
									name:itemname, 
									validTill:{
										[Op.gt]:new Date().getTime()
									}
								}
							});

		if(itemValidCount>=value.quantity){
			let destroyedItem =  await this.itemModel.destroy({
				where:{
					name:itemname, 
					validTill:{
						[Op.gt]:new Date().getTime()
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
			this.itemModel.bulkCreate(all_item);
			return {};
		}
		catch(err){ throw err }
	}

	async GetItems(itemname:string):Promise<GI>{
		let items  = await this.itemModel.findAll({ 
						raw:true,
						where:{
							name:itemname,
							validTill:{
								[Op.gt]:new Date().getTime()
							}
						}
					});
		let filteredItem = filterItem(items);

		if(filteredItem.filterItems.length){
			return { 
				quantity:filteredItem.filterItems.length,
				validTill:Number(filteredItem.filterItems[filteredItem.timeIndex].validTill) 
			}
		}
		else{
			return{ quantity:0, validTill:null }
		}
	}
}

