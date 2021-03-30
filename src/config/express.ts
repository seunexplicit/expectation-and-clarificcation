import * as express from 'express';
import { Express, Request, Response } from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import { Sequelize } from 'sequelize';
import { InventoryManagerController } from '../controllers';
import { ItemSchema } from '../../db/item/item.schema';
import
import * as path from 'path'
import { fork } from 'child_process';

export class ExpressConfig {
	app:express.Express;
	sequelize:Sequelize;
	itemModel:any;
	
	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.setUpDatabaseConnection();
		fork('').send('autodelete', '');
		this.setUpControllers();
	}
	
	setUpControllers() {
		const controllers = path.resolve('dist', 'controllers');
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
		      min:0
		      idle:1000
		    }
		  });

		this.sequelize.authenticate()
		.then(()=>{
			ItemSchema(this.sequelize).sync(); 
		})
		.catch((err)=>{})
	}

	clientErrorHandler(err:any,req:Request,res:Response,next:Function):void{
        if(err.hasOwnProperty('thrown')){
          res.status(err["status"]).send({error:err.message});
        }
 	}
}