export default function variable_dupliicator(item:AddItem, itemname:string):Array<any>{
	repeatedItems:Array<any> = [];

	for(let j = 0; j<no; j++){
		repeatedItems.push({...val, validityDate:new Date(new Date().getTime()+val.validTill), name:itemname});
	}

	return repeatedItems
}