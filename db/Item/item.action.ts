import { Op, Sequelize } from 'sequelize';
import DuplicateItem from '../../lib/duplicateVar';
import filterItem  from '../../lib/filterItem';
import { ItemsModel } from './item.schema';
import { SellItem as ST, GetItem as GI, AddItem as AI} from '../../models/ItemModel';

export default class ItemDataManipulation{
	itemModel:any;
	 constructor(private sequelize:Sequelize){
	 	this.itemModel = ItemsModel(sequelize);
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
			return this.itemModel.destroy({
				where:{
					name:itemname, 
					validityDate:{
						[Op.gt]:new Date()
					},
					limit:value.quantity 
				}
			})
		}
		else{
			return null;
		}
	}


	async AddItem(items:AI, itemname:string):Promise<any>{
		try{
			let all_item = DuplicateItem(items, itemname);
			return this.itemModel.create(all_item);
		}
		catch(err){ throw err }
	}

	async GetItems(itemname:string):Promise<GI>{
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

