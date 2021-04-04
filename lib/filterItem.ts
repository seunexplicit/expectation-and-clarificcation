export default function filter_item(items:Array<any>):any{
	
	let filterItems:Array<any> = [];
	let maximumValidTime =  0;
	let timeIndex = 0;
	let count  = 0;

	items.forEach((item, index)=>{
		if(item.validTill>new Date().getTime()){
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