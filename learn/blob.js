import blob from '../lib/Blob.js';

let blob1 = new Blob([123]);
console.log(blob1);

var blob2 = blob1.slice(1);
console.log(blob2);

//blob