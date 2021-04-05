
import { Controller, All, Get, Patch, Put, Post, UnauthorizedError, HttpCode, UseAfter } from 'routing-controllers';
import { Service } from 'typedi';
import { NotFoundErrorHandler } from '../middlewares/throwNotFoundError';

@Service()
@HttpCode(401)
@Controller()
@UseAfter(NotFoundErrorHandler)
export class RootController{
	
	@Get('/')
	@Post('/')
	@Patch('/')
	@Put('/')
	@All('/')
	throwUnauthorizedError(){
		throw new UnauthorizedError('Unauthorized');
	}

}