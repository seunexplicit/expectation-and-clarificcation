import {  Sequelize } from 'sequelize';

export class ItemController{

	constructor(private sequelize:Sequelize){}

	async sellItem(item:string):Promise<any>{
		return();
	}

	async addProduct(item:string, value:):Promise<any>{

	}

	async getProduct():Promise<any>{

	}
}