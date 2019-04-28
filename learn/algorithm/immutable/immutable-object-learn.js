// const { Map } = require('immutable');
const test = Immutable.Map({
  a: 1,
  b: 2,
  c: 3
});

var test2 = test.map((key, value) => {
  console.log(key, value);
  // key 1, 2, 3
});

console.log(test2);
// Convert from raw JavaScript objects and arrays.
// This is possible because Immutable.js can treat any JavaScript Array or Object as a Collection. 
// You can take advantage of this in order to get sophisticated collection methods on JavaScript Objects, which otherwise have a very sparse native API. 
// Because Seq evaluates lazily and does not cache intermediate results, these operations can be extremely efficient.


// Map => Object 
// List => Array
// the new objects contains old APIs and special APIS.
let oldMap = Immutable.Map();
let newMap = oldMap.set({'key': 'value'});
let newestMap = newMap.set({
  'key': 'newValue',
  'key2': 'newValue2'
});
console.log(newestMap);

// Map的key是任意的，甚至可以是NaN，注意key值的类型都是string

let key1 = 'name';
const anyKeyMap = Immutable.Map();
anyKeyMap.set(key1, 'hello').get(key1);



