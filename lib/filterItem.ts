export default function filter_item(items:Array<any>):any{
	
	let filterItems:Array<any> = [];
	let maximumValidTime =  0;
	let timeIndex = 0;
	let count  = 0;

	items.forEach((item, index)=>{

		if(new Date(new Date(item.createdAt).getTime()+item.validTill)>new Date()){
			if(count===0){
				maximumValidTime = item.validTill;
				timeIndex = index;
			}
			
			filterItems.push(item);

			if(item.validTill<maximumValidTime) timeIndex = index;

			count++;
		}
	})

	return { timeIndex:timeIndex, filterItems:filterItems };
}