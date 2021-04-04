
import { Controller, All, UnauthorizedError, HttpCode } from 'routing-controllers';

@Controller()
export class RootController{
	@HttpCode(401)
	@All('/')
	throwUnauthorizedError(){
		throw new UnauthorizedError('Unauthorized: you cant access this route')
	}
}