Number('0b111') === 7
Number('0o10') === 8

Number.isFinite(0.1 + 0.2) === true
Number.isFinite(NaN) === false
Number.isNaN(true) === false
Number.isNaN(9 / NaN) === true

Number.parseInt('12.3');
Number.parseFloat('12.34');

Number.isInteger(29.0) === true
Number.isInteger(29.1) === false

Number.EPSILON === Math.pow(2, -52);
Number.EPSILON // 2.220446049250313e-16

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true