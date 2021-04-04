import  { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response } from 'express';

@Middleware({ type: 'after' })
export class NotFoundErrorHandler implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: (err: any) => any) {
    if(!res.headersSent){
    	res.status(404).send(req.url+' not found');
    }
   res.end();
  }
}