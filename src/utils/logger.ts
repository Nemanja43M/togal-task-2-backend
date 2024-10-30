import { createLogger, format, transports } from 'winston';
import config from '../config/config';

const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: config.appName },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }),
  ],
});

export default logger;
