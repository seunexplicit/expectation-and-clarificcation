import { Op, Sequelize } from 'sequelize';
import DuplicateItem from '../../lib/duplicateVar';
import filterItem  from '../../lib/filterItem';
import { ItemModels } from './item.schema';

export default class ItemDataManipulation(){
	itemModel:any;
	 constructor(private sequelize:Sequelize){
	 	this.itemModel = ItemModels(sequelize);
	 }

	 DeleteItem():Promise<any>{
	 	return this.itemModel.destroy({
			where:{
				validityDate:{
					[Op.le]:new Date()
				}
			}
		});
	 }

	async SellItem(quantity:number, itemname:string):any{
		
		let itemValidCount = await this.itemModel.count({
								where:{
									name:itemname, 
									validityDate:{
										[Op.gt]:new Date()
									}
								}
							});

		if(itemValidCount>=quantity){
			return this.itemModel.destroy({
				where:{
					name:itemname, 
					validityDate:{
						[Op.gt]:new Date()
					},
					limit:quantity 
				}
			})
		}
		else{
			return null;
		}
	}


	async AddItem(items:ItemAdd, itemname:string):any{
		try{
			let all_item = DuplicateItem(items, itemname);
			return this.itemModel.create(all_item);
		}
		catch(err){ throw err }
	}

	async GetItems(itemname:string):any{
		let items  = await this.itemModel.find({ where:{name:itemname}});
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

