import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { useExpressServer, useContainer } from 'routing-controllers';
import { logger } from '../common/logger'
import { Container } from 'typedi';
import { CreateConnection } from './connection';
import '../../models/environment_d';
import path from 'path'
import { fork } from 'child_process';

export class ExpressConfig {
	app:express.Express;
	Item:any;
	autoDelete:any = fork('dist/src/child_processes/auto_delete.js');
	
	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.setUpDatabaseConnection();
		Container.set('sequelize', this.Item);
		this.autoDelete.send({m:'autodelete'});
		this.setUpControllers();
	}
	
	setUpControllers() {
		const controllersPath = path.resolve('dist', 'src/controllers');
		useContainer(Container); 
		useExpressServer(this.app, 
			{ 
				controllers: [ controllersPath+'/*.js' ],
				cors:true
			});
	}


	setUpDatabaseConnection(){
		this.Item =  CreateConnection().itemsModel;
		console.log(this.Item, 'from setUpDatabaseConnection');
		
	}

	clientErrorHandler(err:any,req:Request,res:Response,next:Function):void{
        if(err.hasOwnProperty('thrown')){
          res.status(err["status"]).send({error:err.message});
        }
 	}
}