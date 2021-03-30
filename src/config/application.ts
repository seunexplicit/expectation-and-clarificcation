import { logger } from '../common/Logging'
import { ExpressConfig } from './express';
import * as config from 'config';

export class Application {
	
	server: any; 
	express: ExpressConfig;
	
	constructor() {
		this.express = new ExpressConfig();
		const port = config.get('express.port');
		const debugPort  = config.get('express.debug'); 
		this.server = this.express.app.listen(port, () => {
		logger.info(`Server Started! Express: http://localhost:${port}`);});
 	}
}