import * as winston from 'winston';

export const logger = winston.createLogger({
    level:'info',
    defaultMeta:'item app',
    format:winston.format.json(),
    transports:[
    	new winston.transports.File({filename:'error.log', level:'error'})
    ]
  });

const env = 'development';

// Development Logger
if(env === 'development') {
  logger.add(new winston.transports.Console({
  	format:winston.format.simple()
  }));
}

process.on('unhandledRejection', function (reason, p) {
  console.log(p, reason, 'system level error');
  logger.warn('system level exceptions at : ', p, ' reason: ', reason);
});