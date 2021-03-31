import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Sequelize } from 'sequelize';
import { ItemsModel } from '../../db/Item/item.schema';
import { logger } from '../common/logger'
import { Container } from 'typedi';
import '../../models/environment_d';
import path from 'path'
import { fork } from 'child_process';

export class ExpressConfig {
	app:express.Express;
	sequelize:any;
	Item:any;
	autoDelete:any = fork('dist/src/child_processes/auto_delete.js');
	
	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.setUpDatabaseConnection();
		this.autoDelete.send({m:'autodelete'});
		this.setUpControllers();
	}
	
	setUpControllers() {
		const controllersPath = path.resolve('dist', 'src/controllers');
		useContainer(Container); 
		Container.set('sequelize', this.Item);
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
		this.Item = ItemsModel(this.sequelize);
		this.sequelize.sync()
		.then((connection:any)=>{
			console.log('i tolf u am going to get here');
			logger.info('db connection successful '+connection)
		})
		.catch((error:any)=>{ logger.info('an error occur '+error) })
		
	}

	clientErrorHandler(err:any,req:Request,res:Response,next:Function):void{
        if(err.hasOwnProperty('thrown')){
          res.status(err["status"]).send({error:err.message});
        }
 	}
}