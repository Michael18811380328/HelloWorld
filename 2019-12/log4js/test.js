'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger();
 
// 这一句话设置日志的级别：如果设置info，那么debug的日志不会被打印
// logger.level = 'info';
logger.level = 'debug';

logger.debug('this is debug');
logger.info('this is info');
logger.warn('this is warn');