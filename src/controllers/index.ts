
import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode } from 'routing-controllers';
import { Sequelize } from 'sequelize';
import { Request, Response } from 'express';
import { AddItem, SellItem, GetItem } from '../../models/ItemModel';
import ItemDataManipulation from '../../db/Item/item.action';

@Controller('/:item')
export class InventoryManagerController{

	dbAction:ItemDataManipulation;

	constructor(sequelize:Sequelize){
		this.dbAction = new ItemDataManipulation(sequelize);
	}

	@HttpCode(200)
	@Get('/quantity')
	getItem(@Param('item') itemname:string){
		return this.dbAction.GetItems(itemname); 
		/*this.dbAction.GetItems()
		.then((items)=>{res.status(200).send()})
		.catch((err)=>{})*/
	}

	@Post('/add')
	addItem(@Param('item') itemname:string, @Body() value:AddItem){
		return this.dbAction.AddItem(value, itemname);
	}

	@Post('/sell')
	sellItem(@Param('item') itemname:string, @Body() values:SellItem){
		return this.dbAction.SellItem(values, itemname);
	}
}