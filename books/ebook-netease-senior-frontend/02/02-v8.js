/**
 * [format: translate byte to MB]
 * @author Michael An
 * @DateTime 2020-04-23T14:28:20+0800
 * @param    {[type]}                 bytes [number]
 * @return   {[type]}                       [null]
 */
var format = function(bytes) {
  return (bytes / 1024 / 1024 ).toFixed(2) + 'MB';
}

/**
 * [getMomory: get Node memory information]
 * @author Michael An
 * @DateTime 2020-04-23T14:29:03+0800
 * @return   {[type]}                 [description]
 */
function getMomory() {
  var mem = process.memoryUsage();
  console.log(mem.heapTotal);
  console.log(mem.heapUsed);
  console.log(mem.rss);
}

/**
 * [onCache: manage cache data]
 * @author Michael An
 * @DateTime 2020-04-23T14:32:27+0800
 * @return   {[type]}                 [null]
 */
function onCache() {
  var cache = [];
}

onCache.prototype.clean = function() {
  cache = [];
}

onCache.prototype.push = function(item) {
  cache.push(item);
  if (cache.length > 10) {
    cache.shift();
  }
}

onCache.prototype.pop = function() {
  return cache.pop();
}

onCache.prototype.lenght = function() {
  return cache.length;
}

// updating slice of file can decrease memory usage
import { createReadStream, write } from 'fs';

fs.readFile();
createReadStream().pipe(write);
file.slice(0, 1000);
file.slice(1000, 2000);
