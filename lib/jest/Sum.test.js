const sum = require('./Sum.js')

test('test 1 plus 2 result', () => {
  expect(sum(1 , 2)).toBe(3);
});

test('test 2 plus 2 should equal 4', () => {
  expect(sum(2 , 2)).toBe(4);
});

test('test 0 plus 0 should equal 0', () =>{
  expect(sum(0, 0)).toBe(0);
  expect(sum(0, 1)).not.toBe(3);
})