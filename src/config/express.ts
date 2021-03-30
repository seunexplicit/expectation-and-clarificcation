import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../../db/Item/item.schema';
import { Container } from 'typedi';
import '../../models/environment.d';
import path from 'path'
import { fork } from 'child_process';

export class ExpressConfig {
	app:express.Express;
	sequelize:any;
	itemModel:any;
	autoDelete:any = fork('../child_process/auto_delete');
	
	constructor() {
		dotenv.config();
		this.app = express();
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.setUpDatabaseConnection();
		
		this.setUpControllers();
	}
	
	setUpControllers() {
		const controllersPath = path.resolve('dist', 'service-layer/controllers');
		useContainer(Container); 
		useExpressServer(this.app, 
			{ 
				controllers: [ controllersPath+'/*.js' ],
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
		Container.set('sequelize', this.sequelize);
		this.sequelize.authenticate()
		.then(()=>{
			ItemsModel(this.sequelize).sync(); 
			this.autoDelete.send('autodelete', this.sequelize);
		})
		.catch((err:any)=>{})
	}

	clientErrorHandler(err:any,req:Request,res:Response,next:Function):void{
        if(err.hasOwnProperty('thrown')){
          res.status(err["status"]).send({error:err.message});
        }
 	}
}