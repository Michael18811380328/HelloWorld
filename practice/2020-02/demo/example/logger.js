import path from 'path';
import { configure, getLogger } from 'log4js';

var logDir = process.env.LOG_DIR ? process.env.LOG_DIR : "./logs";

const logger = getLogger('renew-reminder');
const logFile = path.join(logDir, 'example.log');

configure({
  appenders: { logger: { type: 'file', filename: logFile } },
  categories: { default: { appenders: ['logger'], level: 'debug' } }
});

export default logger;