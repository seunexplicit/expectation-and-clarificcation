import  { Middleware,  ExpressMiddlewareInterface, NotFoundError } from 'routing-controllers';
import { RequestHandler } from 'express';
import { Service } from 'typedi';

@Service()
export class NotFoundErrorHandler implements ExpressMiddlewareInterface {
  public use:RequestHandler = (req: any, res: any, next: (err: any) => any):void =>{
  	res.status(404).send('Route Not Found');
  }

}