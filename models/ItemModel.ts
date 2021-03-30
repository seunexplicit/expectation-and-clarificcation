export interface GetItem{
	quantity:number,
	validTill:number|null
}

export interface SellItem{
	quantity:number,
}

export interface  AddItem{
	quantity:number,
	expiry:number
}