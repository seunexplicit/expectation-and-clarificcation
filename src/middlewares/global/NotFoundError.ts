import  { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { RequestHandler } from 'express';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class NotFoundErrorHandler implements ExpressErrorMiddlewareInterface {
  
  public error(error:any, req: any, res: any, next: (err: any) => any):void{
    if(!res.headersSent&&error.message==='NotFound'){
    	res.status(404).send(req.url+' not found');
    	res.end();
    }
   
	next(error)   
  }

}

export const handleNotFound:RequestHandler = (req: any, res: any, next: (err: any) => any):void =>{
  	if(!res.headersSent){
  		res.status(404).send('Route Not Found');
  	}
 }