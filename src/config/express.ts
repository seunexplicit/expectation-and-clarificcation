import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import { Sequelize } from 'sequelize';
import { InventoryManagerController } from '../controllers';
import { ItemsModel } from '../../db/Item/item.schema';
import path from 'path'
import { fork } from 'child_process';

export class ExpressConfig {
	app:express.Express;
	sequelize:Sequelize;
	itemModel:any;
	autoDelete:any = fork('../child_process/auto_delete');
	
	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.setUpDatabaseConnection();
		this.autoDelete.send('autodelete', this.sequelize);
		this.setUpControllers();
	}
	
	setUpControllers() {
		const inventoryManagerController = new InventoryManagerController(this.sequelize); 
		useExpressServer(this.app, 
			{ 
				controllers: [ inventoryManagerController ],
				cors:true
			});
	}


	setUpDatabaseConnection(){
		this.sequelize = new Sequelize(
		  'mysql', 
		  process.env.DATABASE_USER,
		  process.env.DATABASE_PASSWORD, {
		    host:'localhost',
		    dialect:'mysql',
		    pool:{
		      max:5,
		      min:0,
		      idle:1000
		    }
		  });

		this.sequelize.authenticate()
		.then(()=>{
			ItemsModel(this.sequelize).sync(); 
		})
		.catch((err:any)=>{})
	}

	clientErrorHandler(err:any,req:Request,res:Response,next:Function):void{
        if(err.hasOwnProperty('thrown')){
          res.status(err["status"]).send({error:err.message});
        }
 	}
}