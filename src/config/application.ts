import { logger } from '../common/logger'
import { ExpressConfig } from './express';

export class Application {
	
	server: any; 
	express: ExpressConfig;
	
	constructor() {
		this.express = new ExpressConfig();
		const port = process.env.PORT || 8081;
		const debugPort  = 5058; 
		this.server = this.express.app.listen(port, () => {
			console.log('listening at port '+port);
			logger.info(`Server Started! Express: http://localhost:${port}`);
		});
 	}
}