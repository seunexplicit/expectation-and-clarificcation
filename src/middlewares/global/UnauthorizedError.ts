import  { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class UnauthorizedErrorHandler implements ExpressErrorMiddlewareInterface {
  
  public error(error:any, req: any, res: any, next: (err: any) => any):void{
    if(!res.headersSent&&error.message==='Unauthorized'){
    	res.status(401).send('You Not Authorized To Access This Route');
    	res.end();
    }
   	next(error);
  }

}