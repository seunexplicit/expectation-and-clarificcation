import { AddItem } from '../models/ItemModel';

export default function variable_dupliicator(item:AddItem, itemname:string):Array<any>{
	let repeatedItems:Array<any> = [];

	for(let j = 0; j<item.quantity; j++){
		repeatedItems.push({validityDate:new Date(new Date().getTime()+item.expiry), validTill:item.expiry, name:itemname});
	}

	return repeatedItems
}