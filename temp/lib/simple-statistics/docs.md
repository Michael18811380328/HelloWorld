# 说明文档

## 基本描述性统计

### min

The min is the lowest number in the array. This runs on `O(n)`, linear time in respect to the array

min(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` sample of one or more data points

Returns

`number`: minimum value

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if the the length of x is less than one

Example

```
min([1, 5, -10, 100, 2]); // => -10
```

### max

This computes the maximum number in an array.

This runs on `O(n)`, linear time in respect to the array

max(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` sample of one or more data points

Returns

`number`: maximum value

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if the the length of x is less than one

Example

```
max([1, 2, 3, 4]);
// => 4
```

### sum

Our default sum is the [Kahan-Babuska algorithm](https://pdfs.semanticscholar.org/1760/7d467cda1d0277ad272deb2113533131dc09.pdf). This method is an improvement over the classical [Kahan summation algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm). It aims at computing the sum of a list of numbers while correcting for floating-point errors. Traditionally, sums are calculated as many successive additions, each one with its own floating-point roundoff. These losses in precision add up as the number of numbers increases. This alternative algorithm is more accurate than the simple way of calculating sums by simple addition.

This runs on `O(n)`, linear time in respect to the array.

sum(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input

Returns

`number`: sum of all input numbers

```
sum([1, 2, 3]); // => 6
```

### sumSimple

The simple [sum](https://en.wikipedia.org/wiki/Summation) of an array is the result of adding all numbers together, starting from zero.

This runs on `O(n)`, linear time in respect to the array

sumSimple(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input

Returns

`number`: sum of all input numbers

```
sumSimple([1, 2, 3]); // => 6
```

### quantile

The [quantile](https://en.wikipedia.org/wiki/Quantile): this is a population quantile, since we assume to know the entire dataset in this library. This is an implementation of the [Quantiles of a Population](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population) algorithm from wikipedia.

Sample is a one-dimensional array of numbers, and p is either a decimal number from 0 to 1 or an array of decimal numbers from 0 to 1. In terms of a k/q quantile, p = k/q - it's just dealing with fractions or dealing with decimal values. When p is an array, the result of the function is also an array containing the appropriate quantiles in input order

quantile(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, p: ([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)> | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` sample of one or more numbers

**p** `((Array<number> | number))` the desired quantile, as a number between 0 and 1

Returns

`number`: quantile

```
quantile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
```

### quantileRank

This function returns the quantile in which one would find the given value in the given array. It will copy and sort your array before each run, so if you know your array is already sorted, you should use `quantileRankSorted` instead.

quantileRank(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, value: any): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input

**value** `(any)`

Returns

`number`: value value

```
quantileRank([4, 3, 1, 2], 3); // => 0.75
quantileRank([4, 3, 2, 3, 1], 3); // => 0.7
quantileRank([2, 4, 1, 3], 6); // => 1
quantileRank([5, 3, 1, 2, 3], 4); // => 0.8
```

### product

The [product](https://en.wikipedia.org/wiki/Product_(mathematics)) of an array is the result of multiplying all numbers together, starting using one as the multiplicative identity.

This runs on `O(n)`, linear time in respect to the array

product(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input

Returns

`number`: product of all input numbers

```
product([1, 2, 3, 4]); // => 24
```

## 排序描述性统计

These are special versions of methods that assume your input is sorted. This assumptions lets them run a lot faster, usually in O(1).

### minSorted

The minimum is the lowest number in the array. With a sorted array, the first element in the array is always the smallest, so this calculation can be done in one step, or constant time.

minSorted(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input

Returns

`number`: minimum value

```
minSorted([-100, -10, 1, 2, 5]); // => -100
```

### maxSorted

The maximum is the highest number in the array. With a sorted array, the last element in the array is always the largest, so this calculation can be done in one step, or constant time.

maxSorted(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input

Returns

`number`: maximum value

```
maxSorted([-100, -10, 1, 2, 5]); // => 5
```

### quantileSorted

This is the internal implementation of quantiles: when you know that the order is sorted, you don't need to re-sort it, and the computations are faster.

quantileSorted(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, p: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` sample of one or more data points

**p** `(number)` desired quantile: a number between 0 to 1, inclusive

Returns

`number`: quantile value

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if p ix outside of the range from 0 to 1
- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x is empty

Example

```
quantileSorted([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
```

### quantileRankSorted

This function returns the quantile in which one would find the given value in the given array. With a sorted array, leveraging binary search, we can find this information in logarithmic time.

quantileRankSorted(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, value: any): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input

**value** `(any)`

Returns

`number`: value value

```
quantileRankSorted([1, 2, 3, 4], 3); // => 0.75
quantileRankSorted([1, 2, 3, 3, 4], 3); // => 0.7
quantileRankSorted([1, 2, 3, 4], 6); // => 1
quantileRankSorted([1, 2, 3, 3, 5], 4); // => 0.8
```

## 集中趋势度量

These are different ways to identifying centers or locations of a distribution.

### mean

The mean, *also known as average*, is the sum of all values over the number of values. This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency): a method of finding a typical or central value of a set of numbers.

This runs on `O(n)`, linear time in respect to the array

mean(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` sample of one or more data points

Returns

`number`: mean

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if the the length of x is less than one

Example

```
mean([0, 10]); // => 5
```

### addToMean

When adding a new value to a list, one does not have to necessary recompute the mean of the list in linear time. They can instead use this function to compute the new mean by providing the current mean, the number of elements in the list that produced it and the new value to add.

addToMean(mean: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), n: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), newValue: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Since: 2.5.0

Parameters

**mean** `(number)` current mean

**n** `(number)` number of items in the list

**newValue** `(number)` the added value

Returns

`number`: the new mean

```
addToMean(14, 5, 53); // => 20.5
```

### mode

The [mode](http://bit.ly/W5K4Yt) is the number that appears in a list the highest number of times. There can be multiple modes in a list: in the event of a tie, this algorithm will return the most recently seen mode.

This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency): a method of finding a typical or central value of a set of numbers.

This runs on `O(nlog(n))` because it needs to sort the array internally before running an `O(n)` search to find the mode.

mode(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input

Returns

`number`: mode

```
mode([0, 0, 1]); // => 0
```

### modeSorted

The [mode](http://bit.ly/W5K4Yt) is the number that appears in a list the highest number of times. There can be multiple modes in a list: in the event of a tie, this algorithm will return the most recently seen mode.

This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency): a method of finding a typical or central value of a set of numbers.

This runs in `O(n)` because the input is sorted.

modeSorted(sorted: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**sorted** `(Array<number>)` a sample of one or more data points

Returns

`number`: mode

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if sorted is empty

Example

```
modeSorted([0, 0, 1]); // => 0
```

### modeFast

The [mode](http://bit.ly/W5K4Yt) is the number that appears in a list the highest number of times. There can be multiple modes in a list: in the event of a tie, this algorithm will return the most recently seen mode.

modeFast uses a Map object to keep track of the mode, instead of the approach used with `mode`, a sorted array. As a result, it is faster than `mode` and supports any data type that can be compared with `==`. It also requires a [JavaScript environment with support for Map](https://kangax.github.io/compat-table/es6/#test-Map), and will throw an error if Map is not available.

This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency): a method of finding a typical or central value of a set of numbers.

modeFast(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<any>): any?

Parameters

**x** `(Array<any>)` a sample of one or more data points

Returns

`any?`: mode

- [ReferenceError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError): if the JavaScript environment doesn't support Map
- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x is empty

Example

```
modeFast(['rabbits', 'rabbits', 'squirrels']); // => 'rabbits'
```

### median

The [median](http://en.wikipedia.org/wiki/Median) is the middle number of a list. This is often a good indicator of 'the middle' when there are outliers that skew the `mean()` value. This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency): a method of finding a typical or central value of a set of numbers.

The median isn't necessarily one of the elements in the list: the value can be the average of two elements if the list has an even length and the two central values are different.

median(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input

Returns

`number`: median value

```
median([10, 2, 5, 100, 2, 1]); // => 3.5
```

### medianSorted

The [median](http://en.wikipedia.org/wiki/Median) is the middle number of a list. This is often a good indicator of 'the middle' when there are outliers that skew the `mean()` value. This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency): a method of finding a typical or central value of a set of numbers.

The median isn't necessarily one of the elements in the list: the value can be the average of two elements if the list has an even length and the two central values are different.

medianSorted(sorted: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**sorted** `(Array<number>)` input

Returns

`number`: median value

```
medianSorted([10, 2, 5, 100, 2, 1]); // => 52.5
```

### harmonicMean

The [Harmonic Mean](https://en.wikipedia.org/wiki/Harmonic_mean) is a mean function typically used to find the average of rates. This mean is calculated by taking the reciprocal of the arithmetic mean of the reciprocals of the input numbers.

This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency): a method of finding a typical or central value of a set of numbers.

This runs on `O(n)`, linear time in respect to the array.

harmonicMean(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` sample of one or more data points

Returns

`number`: harmonic mean

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x is empty
- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x contains a negative number

Example

```
harmonicMean([2, 3]).toFixed(2) // => '2.40'
```

### geometricMean

The [Geometric Mean](https://en.wikipedia.org/wiki/Geometric_mean) is a mean function that is more useful for numbers in different ranges.

This is the nth root of the input numbers multiplied by each other.

The geometric mean is often useful for **proportional growth**: given growth rates for multiple years, like *80%, 16.66% and 42.85%*, a simple mean will incorrectly estimate an average growth rate, whereas a geometric mean will correctly estimate a growth rate that, over those years, will yield the same end value.

This runs on `O(n)`, linear time in respect to the array

geometricMean(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` sample of one or more data points

Returns

`number`: geometric mean

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x is empty
- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x contains a negative number

Example

```
var growthRates = [1.80, 1.166666, 1.428571];
var averageGrowth = ss.geometricMean(growthRates);
var averageGrowthRates = [averageGrowth, averageGrowth, averageGrowth];
var startingValue = 10;
var startingValueMean = 10;
growthRates.forEach(function(rate) {
  startingValue *= rate;
});
averageGrowthRates.forEach(function(rate) {
  startingValueMean *= rate;
});
startingValueMean === startingValue;
```

### rootMeanSquare

The Root Mean Square (RMS) is a mean function used as a measure of the magnitude of a set of numbers, regardless of their sign. This is the square root of the mean of the squares of the input numbers. This runs on `O(n)`, linear time in respect to the array

rootMeanSquare(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` a sample of one or more data points

Returns

`number`: root mean square

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x is empty

Example

```
rootMeanSquare([-1, 1, -1, 1]); // => 1
```

### sampleSkewness

[Skewness](http://en.wikipedia.org/wiki/Skewness) is a measure of the extent to which a probability distribution of a real-valued random variable "leans" to one side of the mean. The skewness value can be positive or negative, or even undefined.

Implementation is based on the adjusted Fisher-Pearson standardized moment coefficient, which is the version found in Excel and several statistical packages including Minitab, SAS and SPSS.

sampleSkewness(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Since: 4.1.0

Parameters

**x** `(Array<number>)` a sample of 3 or more data points

Returns

`number`: sample skewness

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x has length less than 3

Example

```
sampleSkewness([2, 4, 6, 3, 1]); // => 0.590128656384365
```

## 分散趋势度量

These are different ways of determining how spread out a distribution is.

### variance

The [variance](http://en.wikipedia.org/wiki/Variance) is the sum of squared deviations from the mean.

This is an implementation of variance, not sample variance: see the `sampleVariance` method if you want a sample measure.

variance(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` a population of one or more data points

Returns

`number`: variance: a value greater than or equal to zero. zero indicates that all values are identical.

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x's length is 0

Example

```
variance([1, 2, 3, 4, 5, 6]); // => 2.9166666666666665
```

### sampleVariance

The [sample variance](https://en.wikipedia.org/wiki/Variance#Sample_variance) is the sum of squared deviations from the mean. The sample variance is distinguished from the variance by the usage of [Bessel's Correction](https://en.wikipedia.org/wiki/Bessel's_correction): instead of dividing the sum of squared deviations by the length of the input, it is divided by the length minus one. This corrects the bias in estimating a value from a set that you don't know if full.

References:

- [Wolfram MathWorld on Sample Variance](http://mathworld.wolfram.com/SampleVariance.html)

sampleVariance(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` a sample of two or more data points

Returns

`number`: sample variance

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if the length of x is less than 2

Example

```
sampleVariance([1, 2, 3, 4, 5]); // => 2.5
```

### standardDeviation

The [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation) is the square root of the variance. This is also known as the population standard deviation. It's useful for measuring the amount of variation or dispersion in a set of values.

Standard deviation is only appropriate for full-population knowledge: for samples of a population, [sampleStandardDeviation](https://simplestatistics.org/docs/#samplestandarddeviation) is more appropriate.

standardDeviation(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input

Returns

`number`: standard deviation

```
variance([2, 4, 4, 4, 5, 5, 7, 9]); // => 4
standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]); // => 2
```

### sampleStandardDeviation

The [sample standard deviation](http://en.wikipedia.org/wiki/Standard_deviation#Sample_standard_deviation) is the square root of the sample variance.

sampleStandardDeviation(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input array

Returns

`number`: sample standard deviation

```
sampleStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]).toFixed(2);
// => '2.14'
```

### medianAbsoluteDeviation

The [Median Absolute Deviation](http://en.wikipedia.org/wiki/Median_absolute_deviation) is a robust measure of statistical dispersion. It is more resilient to outliers than the standard deviation.

medianAbsoluteDeviation(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` input array

Returns

`number`: median absolute deviation

```
medianAbsoluteDeviation([1, 1, 2, 2, 4, 6, 9]); // => 1
```

### interquartileRange

The [Interquartile range](http://en.wikipedia.org/wiki/Interquartile_range) is a measure of statistical dispersion, or how scattered, spread, or concentrated a distribution is. It's computed as the difference between the third quartile and first quartile.

interquartileRange(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` sample of one or more numbers

Returns

`number`: interquartile range: the span between lower and upper quartile, 0.25 and 0.75

```
interquartileRange([0, 1, 2, 3]); // => 2
```

### sumNthPowerDeviations

The sum of deviations to the Nth power. When n=2 it's the sum of squared deviations. When n=3 it's the sum of cubed deviations.

sumNthPowerDeviations(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, n: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)`

**n** `(number)` power

Returns

`number`: sum of nth power deviations

```
var input = [1, 2, 3];
// since the variance of a set is the mean squared
// deviations, we can calculate that with sumNthPowerDeviations:
sumNthPowerDeviations(input, 2) / input.length;
```

### zScore

The [Z-Score, or Standard Score](http://en.wikipedia.org/wiki/Standard_score).

The standard score is the number of standard deviations an observation or datum is above or below the mean. Thus, a positive standard score represents a datum above the mean, while a negative standard score represents a datum below the mean. It is a dimensionless quantity obtained by subtracting the population mean from an individual raw score and then dividing the difference by the population standard deviation.

The z-score is only defined if one knows the population parameters; if one only has a sample set, then the analogous computation with sample mean and sample standard deviation yields the Student's t-statistic.

zScore(x: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), mean: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), standardDeviation: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(number)`

**mean** `(number)`

**standardDeviation** `(number)`

Returns

`number`: z score

```
zScore(78, 80, 5); // => -0.4
```

## 相似分析

### sampleCorrelation

The [correlation](http://en.wikipedia.org/wiki/Correlation_and_dependence) is a measure of how correlated two datasets are, between -1 and 1

sampleCorrelation(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, y: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` first input

**y** `(Array<number>)` second input

Returns

`number`: sample correlation

```
sampleCorrelation([1, 2, 3, 4, 5, 6], [2, 2, 3, 4, 5, 60]).toFixed(2);
// => '0.69'
```

### sampleCovariance

[Sample covariance](https://en.wikipedia.org/wiki/Sample_mean_and_sampleCovariance) of two datasets: how much do the two datasets move together? x and y are two datasets, represented as arrays of numbers.

sampleCovariance(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, y: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` a sample of two or more data points

**y** `(Array<number>)` a sample of two or more data points

Returns

`number`: sample covariance

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x and y do not have equal lengths
- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x or y have length of one or less

Example

```
sampleCovariance([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1]); // => -3.5
```

### rSquared

The [R Squared](http://en.wikipedia.org/wiki/Coefficient_of_determination) value of data compared with a function `f` is the sum of the squared differences between the prediction and the actual value.

rSquared(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>>, func: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<Array<number>>)` input data: this should be doubly-nested

**func** `(Function)` function called on `[i][0]` values within the dataset

Returns

`number`: r-squared value

```
var samples = [[0, 0], [1, 1]];
var regressionLine = linearRegressionLine(linearRegression(samples));
rSquared(samples, regressionLine); // = 1 this line is a perfect fit
```

## 线性回归

### linearRegression

[Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression) is a simple way to find a fitted line between a set of coordinates. This algorithm finds the slope and y-intercept of a regression line using the least sum of squares.

linearRegression(data: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>>): [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

Parameters

**data** `(Array<Array<number>>)` an array of two-element of arrays, like `[[0, 1], [2, 3]]`

Returns

`Object`: object containing slope and intersect of regression line

```
linearRegression([[0, 0], [1, 1]]); // => { m: 1, b: 0 }
```

### linearRegressionLine

Given the output of `linearRegression`: an object with `m` and `b` values indicating slope and intercept, respectively, generate a line function that translates x values into y values.

linearRegressionLine(mb: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)): [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

Parameters

**mb** `(Object)` object with `m` and `b` members, representing slope and intersect of desired line

Returns

`Function`: method that computes y-value at any given x-value on the line.

```
var l = linearRegressionLine(linearRegression([[0, 0], [1, 1]]));
l(0) // = 0
l(2) // = 2
linearRegressionLine({ b: 0, m: 1 })(1); // => 1
linearRegressionLine({ b: 1, m: 1 })(1); // => 2
```

## 随机分析

### shuffle

A [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle) is a fast way to create a random permutation of a finite set. This is a function around `shuffle_in_place` that adds the guarantee that it will not modify its input.

shuffle(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array), randomSource: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)

Parameters

**x** `(Array)` sample of 0 or more numbers

**randomSource** `(Function = Math.random)` an optional entropy source that returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)

Returns

`Array`: shuffled version of input

```
var shuffled = shuffle([1, 2, 3, 4]);
shuffled; // = [2, 3, 1, 4] or any other random permutation
```

### shuffleInPlace

A [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle) in-place - which means that it **will change the order of the original array by reference**.

This is an algorithm that generates a random [permutation](https://en.wikipedia.org/wiki/Permutation) of a set.

shuffleInPlace(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array), randomSource: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)

Parameters

**x** `(Array)` sample of one or more numbers

**randomSource** `(Function = Math.random)` an optional entropy source that returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)

Returns

`Array`: x

```
var x = [1, 2, 3, 4];
shuffleInPlace(x);
// x is shuffled to a value like [2, 1, 4, 3]
```

### sampleWithReplacement

Sampling with replacement is a type of sampling that allows the same item to be picked out of a population more than once.

sampleWithReplacement(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<any>, n: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), randomSource: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)

Parameters

**x** `(Array<any>)` an array of any kind of value

**n** `(number)` count of how many elements to take

**randomSource** `(Function = Math.random)` an optional entropy source that returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)

Returns

`Array`: n sampled items from the population

```
var values = [1, 2, 3, 4];
sampleWithReplacement(values, 2); // returns 2 random values, like [2, 4];
```

### sample

Create a [simple random sample](http://en.wikipedia.org/wiki/Simple_random_sample) from a given array of `n` elements.

The sampled values will be in any order, not necessarily the order they appear in the input.

sample(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<any>, n: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), randomSource: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)

Parameters

**x** `(Array<any>)` input array. can contain any type

**n** `(number)` count of how many elements to take

**randomSource** `(Function = Math.random)` an optional entropy source that returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)

Returns

`Array`: subset of n elements in original array

```
var values = [1, 2, 4, 5, 6, 7, 8, 9];
sample(values, 3); // returns 3 random values, like [2, 5, 8];
```

## 分类

### BayesianClassifier

[Bayesian Classifier](http://en.wikipedia.org/wiki/Naive_Bayes_classifier)

This is a naïve bayesian classifier that takes singly-nested objects.

new BayesianClassifier()

Example

```
var bayes = new BayesianClassifier();
bayes.train({
  species: 'Cat'
}, 'animal');
var result = bayes.score({
  species: 'Cat'
})
// result
// {
//   animal: 1
// }
```

Instance Members

▸ train(item, category)

▸ score(item)

### PerceptronModel

This is a single-layer [Perceptron Classifier](http://en.wikipedia.org/wiki/Perceptron) that takes arrays of numbers and predicts whether they should be classified as either 0 or 1 (negative or positive examples).

new PerceptronModel()

Example

```
// Create the model
var p = new PerceptronModel();
// Train the model with input with a diagonal boundary.
for (var i = 0; i < 5; i++) {
    p.train([1, 1], 1);
    p.train([0, 1], 0);
    p.train([1, 0], 0);
    p.train([0, 0], 0);
}
p.predict([0, 0]); // 0
p.predict([0, 1]); // 0
p.predict([1, 0]); // 0
p.predict([1, 1]); // 1
```

Instance Members

▸ predict(features)

▸ train(features, label)

## 分布

### bernoulliDistribution

The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution) is the probability discrete distribution of a random variable which takes value 1 with success probability `p` and value 0 with failure probability `q` = 1 - `p`. It can be used, for example, to represent the toss of a coin, where "1" is defined to mean "heads" and "0" is defined to mean "tails" (or vice versa). It is a special case of a Binomial Distribution where `n` = 1.

bernoulliDistribution(p: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

Parameters

**p** `(number)` input value, between 0 and 1 inclusive

Returns

`Array<number>`: values of bernoulli distribution at this point

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if p is outside 0 and 1

Example

```
bernoulliDistribution(0.3); // => [0.7, 0.3]
```

### binomialDistribution

The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution) is the discrete probability distribution of the number of successes in a sequence of n independent yes/no experiments, each of which yields success with probability `probability`. Such a success/failure experiment is also called a Bernoulli experiment or Bernoulli trial; when trials = 1, the Binomial Distribution is a Bernoulli Distribution.

binomialDistribution(trials: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), probability: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

Parameters

**trials** `(number)` number of trials to simulate

**probability** `(number)`

Returns

`Array<number>`: output

### poissonDistribution

The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution) is a discrete probability distribution that expresses the probability of a given number of events occurring in a fixed interval of time and/or space if these events occur with a known average rate and independently of the time since the last event.

The Poisson Distribution is characterized by the strictly positive mean arrival or occurrence rate, `λ`.

poissonDistribution(lambda: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

Parameters

**lambda** `(number)` location poisson distribution

Returns

`Array<number>`: values of poisson distribution at that point

### chiSquaredDistributionTable

**Percentage Points of the χ2 (Chi-Squared) Distribution**

The [χ2 (Chi-Squared) Distribution](http://en.wikipedia.org/wiki/Chi-squared_distribution) is used in the common chi-squared tests for goodness of fit of an observed distribution to a theoretical one, the independence of two criteria of classification of qualitative data, and in confidence interval estimation for a population standard deviation of a normal distribution from a sample standard deviation.

Values from Appendix 1, Table III of William W. Hines & Douglas C. Montgomery, "Probability and Statistics in Engineering and Management Science", Wiley (1980).

chiSquaredDistributionTable

### standardNormalTable

A standard normal table, also called the unit normal table or Z table, is a mathematical table for the values of Φ (phi), which are the values of the cumulative distribution function of the normal distribution. It is used to find the probability that a statistic is observed below, above, or between values on the standard normal distribution, and by extension, any normal distribution.

The probabilities are calculated using the [Cumulative distribution function](https://en.wikipedia.org/wiki/Normal_distribution#Cumulative_distribution_function). The table used is the cumulative, and not cumulative from 0 to mean (even though the latter has 5 digits precision, instead of 4).

standardNormalTable

### tTest

This is to compute [a one-sample t-test](https://en.wikipedia.org/wiki/Student's_t-test#One-sample_t-test), comparing the mean of a sample to a known value, x.

in this case, we're trying to determine whether the population mean is equal to the value that we know, which is `x` here. usually the results here are used to look up a [p-value](http://en.wikipedia.org/wiki/P-value), which, for a certain level of significance, will let you determine that the null hypothesis can or cannot be rejected.

tTest(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, expectedValue: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` sample of one or more numbers

**expectedValue** `(number)` expected value of the population mean

Returns

`number`: value

```
tTest([1, 2, 3, 4, 5, 6], 3.385).toFixed(2); // => '0.16'
```

### tTestTwoSample

This is to compute [two sample t-test](http://en.wikipedia.org/wiki/Student's_t-test). Tests whether "mean(X)-mean(Y) = difference", ( in the most common case, we often have `difference == 0` to test if two samples are likely to be taken from populations with the same mean value) with no prior knowledge on standard deviations of both samples other than the fact that they have the same standard deviation.

Usually the results here are used to look up a [p-value](http://en.wikipedia.org/wiki/P-value), which, for a certain level of significance, will let you determine that the null hypothesis can or cannot be rejected.

`diff` can be omitted if it equals 0.

[This is used to confirm or deny](http://www.monarchlab.org/Lab/Research/Stats/2SampleT.aspx) a null hypothesis that the two populations that have been sampled into `sampleX` and `sampleY` are equal to each other.

tTestTwoSample(sampleX: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, sampleY: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, difference: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): ([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | null)

Parameters

**sampleX** `(Array<number>)` a sample as an array of numbers

**sampleY** `(Array<number>)` a sample as an array of numbers

**difference** `(number = 0)`

Returns

`(number | null)`: test result

```
tTestTwoSample([1, 2, 3, 4], [3, 4, 5, 6], 0); // => -2.1908902300206643
```

### permutationTest

Conducts a [permutation test](https://en.wikipedia.org/wiki/Resampling_(statistics)#Permutation_tests) to determine if two data sets are *significantly* different from each other, using the difference of means between the groups as the test statistic. The function allows for the following hypotheses:

- two_tail = Null hypothesis: the two distributions are equal.
- greater = Null hypothesis: observations from sampleX tend to be smaller than those from sampleY.
- less = Null hypothesis: observations from sampleX tend to be greater than those from sampleY. [Learn more about one-tail vs two-tail tests.](https://en.wikipedia.org/wiki/One-_and_two-tailed_tests)

permutationTest(sampleX: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, sampleY: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, alternative: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), k: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**sampleX** `(Array<number>)` first dataset (e.g. treatment data)

**sampleY** `(Array<number>)` second dataset (e.g. control data)

**alternative** `(string)` alternative hypothesis, either 'two_sided' (default), 'greater', or 'less'

**k** `(number)` number of values in permutation distribution.

Returns

`number`: p-value The probability of observing the difference between groups (as or more extreme than what we did), assuming the null hypothesis.

```
var control = [2, 5, 3, 6, 7, 2, 5];
var treatment = [20, 5, 13, 12, 7, 2, 2];
permutationTest(control, treatment); // ~0.1324
```

### cumulativeStdNormalProbability

**Cumulative Standard Normal Probability**

Since probability tables cannot be printed for every normal distribution, as there are an infinite variety of normal distributions, it is common practice to convert a normal to a standard normal and then use the standard normal table to find probabilities.

You can use `.5 + .5 * errorFunction(x / Math.sqrt(2))` to calculate the probability instead of looking it up in a table.

cumulativeStdNormalProbability(z: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**z** `(number)`

Returns

`number`: cumulative standard normal probability

## 误差

### errorFunction

**Gaussian error function**

The `errorFunction(x/(sd * Math.sqrt(2)))` is the probability that a value in a normal distribution with standard deviation sd is within x of the mean.

This function returns a numerical approximation to the exact value. It uses Horner's method to evaluate the polynomial of τ (tau).

errorFunction(x: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(number)` input

Returns

`number`: error estimation

```
errorFunction(1).toFixed(2); // => '0.84'
```

### inverseErrorFunction

The Inverse [Gaussian error function](http://en.wikipedia.org/wiki/Error_function) returns a numerical approximation to the value that would have caused `errorFunction()` to return x.

inverseErrorFunction(x: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(number)` value of error function

Returns

`number`: estimated inverted value

### probit

The [Probit](http://en.wikipedia.org/wiki/Probit) is the inverse of cumulativeStdNormalProbability(), and is also known as the normal quantile function.

It returns the number of standard deviations from the mean where the p'th quantile of values can be found in a normal distribution. So, for example, probit(0.5 + 0.6827/2) ≈ 1 because 68.27% of values are normally found within 1 standard deviation above or below the mean.

probit(p: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**p** `(number)`

Returns

`number`: probit

## 突变

Breaks methods split datasets into chunks. Often these are used for segmentation or visualization of a dataset. A method of computing breaks that splits data evenly can make for a better choropleth map, for instance, because each color will be represented equally.

### ckmeans

Ckmeans clustering is an improvement on heuristic-based clustering approaches like Jenks. The algorithm was developed in [Haizhou Wang and Mingzhou Song](http://journal.r-project.org/archive/2011-2/RJournal_2011-2_Wang+Song.pdf) as a [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) approach to the problem of clustering numeric data into groups with the least within-group sum-of-squared-deviations.

Minimizing the difference within groups - what Wang & Song refer to as `withinss`, or within sum-of-squares, means that groups are optimally homogenous within and the data is split into representative groups. This is very useful for visualization, where you may want to represent a continuous variable in discrete color or style groups. This function can provide groups that emphasize differences between data.

Being a dynamic approach, this algorithm is based on two matrices that store incrementally-computed values for squared deviations and backtracking indexes.

This implementation is based on Ckmeans 3.4.6, which introduced a new divide and conquer approach that improved runtime from O(kn^2) to O(kn log(n)).

Unlike the [original implementation](https://cran.r-project.org/web/packages/Ckmeans.1d.dp/index.html), this implementation does not include any code to automatically determine the optimal number of clusters: this information needs to be explicitly provided.

### References

*Ckmeans.1d.dp: Optimal k-means Clustering in One Dimension by Dynamic Programming* Haizhou Wang and Mingzhou Song ISSN 2073-4859

from The R Journal Vol. 3/2, December 2011

ckmeans(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, nClusters: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>>

Parameters

**x** `(Array<number>)` input data, as an array of number values

**nClusters** `(number)` number of desired classes. This cannot be greater than the number of values in the data array.

Returns

`Array<Array<number>>`: clustered input

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if the number of requested clusters is higher than the size of the data

Example

```
ckmeans([-1, 2, -1, 2, 4, 5, 6, -1, 2, -1], 3);
// The input, clustered into groups of similar numbers.
//= [[-1, -1, -1, -1], [2, 2, 2], [4, 5, 6]]);
```

### equalIntervalBreaks

Given an array of x, this will find the extent of the x and return an array of breaks that can be used to categorize the x into a number of classes. The returned array will always be 1 longer than the number of classes because it includes the minimum value.

equalIntervalBreaks(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, nClasses: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

Parameters

**x** `(Array<number>)` an array of number values

**nClasses** `(number)` number of desired classes

Returns

`Array<number>`: array of class break positions

```
equalIntervalBreaks([1, 2, 3, 4, 5, 6], 4); // => [1, 2.25, 3.5, 4.75, 6]
```

## 工具函数

### chunk

Split an array into chunks of a specified size. This function has the same behavior as [PHP's array_chunk](http://php.net/manual/en/function.array-chunk.php) function, and thus will insert smaller-sized chunks at the end if the input size is not divisible by the chunk size.

`x` is expected to be an array, and `chunkSize` a number. The `x` array can contain any kind of data.

chunk(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array), chunkSize: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)>

Parameters

**x** `(Array)` a sample

**chunkSize** `(number)` size of each output array. must be a positive integer

Returns

`Array<Array>`: a chunked array

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if chunk size is less than 1 or not an integer

Example

```
chunk([1, 2, 3, 4, 5, 6], 2);
// => [[1, 2], [3, 4], [5, 6]]
```

### chiSquaredGoodnessOfFit

The [χ2 (Chi-Squared) Goodness-of-Fit Test](http://en.wikipedia.org/wiki/Goodness_of_fit#Pearson.27s_chi-squared_test) uses a measure of goodness of fit which is the sum of differences between observed and expected outcome frequencies (that is, counts of observations), each squared and divided by the number of observations expected given the hypothesized distribution. The resulting χ2 statistic, `chiSquared`, can be compared to the chi-squared distribution to determine the goodness of fit. In order to determine the degrees of freedom of the chi-squared distribution, one takes the total number of observed frequencies and subtracts the number of estimated parameters. The test statistic follows, approximately, a chi-square distribution with (k − c) degrees of freedom where `k` is the number of non-empty cells and `c` is the number of estimated parameters for the distribution.

chiSquaredGoodnessOfFit(data: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, distributionType: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function), significance: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**data** `(Array<number>)`

**distributionType** `(Function)` a function that returns a point in a distribution: for instance, binomial, bernoulli, or poisson

**significance** `(number)`

Returns

`number`: chi squared goodness of fit

```
// Data from Poisson goodness-of-fit example 10-19 in William W. Hines & Douglas C. Montgomery,
// "Probability and Statistics in Engineering and Management Science", Wiley (1980).
var data1019 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3
];
ss.chiSquaredGoodnessOfFit(data1019, ss.poissonDistribution, 0.05); //= false
```

### epsilon

We use `ε`, epsilon, as a stopping criterion when we want to iterate until we're "close enough". Epsilon is a very small number: for simple statistics, that number is **0.0001**

This is used in calculations like the binomialDistribution, in which the process of finding a value is [iterative](https://en.wikipedia.org/wiki/Iterative_method): it progresses until it is close enough.

Below is an example of using epsilon in [gradient descent](https://en.wikipedia.org/wiki/Gradient_descent), where we're trying to find a local minimum of a function's derivative, given by the `fDerivative` method.

epsilon

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Example

```
// From calculation, we expect that the local minimum occurs at x=9/4
var x_old = 0;
// The algorithm starts at x=6
var x_new = 6;
var stepSize = 0.01;

function fDerivative(x) {
  return 4 * Math.pow(x, 3) - 9 * Math.pow(x, 2);
}

// The loop runs until the difference between the previous
// value and the current value is smaller than epsilon - a rough
// meaure of 'close enough'
while (Math.abs(x_new - x_old) > ss.epsilon) {
  x_old = x_new;
  x_new = x_old - stepSize * fDerivative(x_old);
}

console.log('Local minimum occurs at', x_new);
```

### factorial

A [Factorial](https://en.wikipedia.org/wiki/Factorial), usually written n!, is the product of all positive integers less than or equal to n. Often factorial is implemented recursively, but this iterative approach is significantly faster and simpler.

factorial(n: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**n** `(number)` input, must be an integer number 1 or greater

Returns

`number`: factorial: n!

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if n is less than 0 or not an integer

Example

```
factorial(5); // => 120
```

### gamma

Compute the [gamma function](https://en.wikipedia.org/wiki/Gamma_function) of a value using Nemes' approximation. The gamma of n is equivalent to (n-1)!, but unlike the factorial function, gamma is defined for all real n except zero and negative integers (where NaN is returned). Note, the gamma function is also well-defined for complex numbers, though this implementation currently does not handle complex numbers as input values. Nemes' approximation is defined [here](https://arxiv.org/abs/1003.6020) as Theorem 2.2. Negative values use [Euler's reflection formula](https://en.wikipedia.org/wiki/Gamma_function#Properties) for computation.

gamma(n: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**n** `(number)` Any real number except for zero and negative integers.

Returns

`number`: The gamma of the input value.

```
gamma(11.5); // 11899423.084037038
gamma(-11.5); // 2.29575810481609e-8
gamma(5); // 24
```

### gammaln

Compute the logarithm of the [gamma function](https://en.wikipedia.org/wiki/Gamma_function) of a value using Lanczos' approximation. This function takes as input any real-value n greater than 0. This function is useful for values of n too large for the normal gamma function (n > 165). The code is based on Lanczo's Gamma approximation, defined [here](http://my.fit.edu/~gabdo/gamma.txt).

gammaln(n: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**n** `(number)` Any real number greater than zero.

Returns

`number`: The logarithm of gamma of the input value.

```
gammaln(500); // 2605.1158503617335
gammaln(2.4); // 0.21685932244884043
```

### uniqueCountSorted

For a sorted input, counting the number of unique values is possible in constant time and constant memory. This is a simple implementation of the algorithm.

Values are compared with `===`, so objects and non-primitive objects are not handled in any special way.

uniqueCountSorted(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<any>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<any>)` an array of any kind of value

Returns

`number`: count of unique values

```
uniqueCountSorted([1, 2, 3]); // => 3
uniqueCountSorted([1, 1, 1]); // => 1
```

### extent

This computes the minimum & maximum number in an array.

This runs on `O(n)`, linear time in respect to the array

extent(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

Parameters

**x** `(Array<number>)` sample of one or more data points

Returns

`Array<number>`: minimum & maximum value

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if the the length of x is less than one

Example

```
extent([1, 2, 3, 4]);
// => [1, 4]
```

### extentSorted

The extent is the lowest & highest number in the array. With a sorted array, the first element in the array is always the lowest while the last element is always the largest, so this calculation can be done in one step, or constant time.

extentSorted(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

Parameters

**x** `(Array<number>)` input

Returns

`Array<number>`: minimum & maximum value

```
extentSorted([-100, -10, 1, 2, 5]); // => [-100, 5]
```

### sampleKurtosis

[Kurtosis](http://en.wikipedia.org/wiki/Kurtosis) is a measure of the heaviness of a distribution's tails relative to its variance. The kurtosis value can be positive or negative, or even undefined.

Implementation is based on Fisher's excess kurtosis definition and uses unbiased moment estimators. This is the version found in Excel and available in several statistical packages, including SAS and SciPy.

sampleKurtosis(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**x** `(Array<number>)` a sample of 4 or more data points

Returns

`number`: sample kurtosis

- [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error): if x has length less than 4

Example

```
sampleKurtosis([1, 2, 2, 3, 5]); // => 1.4555765595463122
```

### permutationsHeap

Implementation of [Heap's Algorithm](https://en.wikipedia.org/wiki/Heap's_algorithm) for generating permutations.

permutationsHeap(elements: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)>

Parameters

**elements** `(Array)` any type of data

Returns

`Array<Array>`: array of permutations

### combinations

Implementation of Combinations Combinations are unique subsets of a collection - in this case, k x from a collection at a time. https://en.wikipedia.org/wiki/Combination

combinations(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array), k: int): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)>

Parameters

**x** `(Array)` any type of data

**k** `(int)` the number of objects in each group (without replacement)

Returns

`Array<Array>`: array of permutations

```
combinations([1, 2, 3], 2); // => [[1,2], [1,3], [2,3]]
```

### combinationsReplacement

Implementation of [Combinations](https://en.wikipedia.org/wiki/Combination) with replacement Combinations are unique subsets of a collection - in this case, k x from a collection at a time. 'With replacement' means that a given element can be chosen multiple times. Unlike permutation, order doesn't matter for combinations.

combinationsReplacement(x: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array), k: int): [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)>

Parameters

**x** `(Array)` any type of data

**k** `(int)` the number of objects in each group (without replacement)

Returns

`Array<Array>`: array of permutations

```
combinationsReplacement([1, 2], 2); // => [[1, 1], [1, 2], [2, 2]]
```

### combineMeans

When combining two lists of values for which one already knows the means, one does not have to necessary recompute the mean of the combined lists in linear time. They can instead use this function to compute the combined mean by providing the mean & number of values of the first list and the mean & number of values of the second list.

combineMeans(mean1: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), n1: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), mean2: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), n2: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Since: 3.0.0

Parameters

**mean1** `(number)` mean of the first list

**n1** `(number)` number of items in the first list

**mean2** `(number)` mean of the second list

**n2** `(number)` number of items in the second list

Returns

`number`: the combined mean

```
combineMeans(5, 3, 4, 3); // => 4.5
```

### combineVariances

When combining two lists of values for which one already knows the variances, one does not have to necessary recompute the variance of the combined lists in linear time. They can instead use this function to compute the combined variance by providing the variance, mean & number of values of the first list and the variance, mean & number of values of the second list.

combineVariances(variance1: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), mean1: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), n1: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), variance2: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), mean2: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), n2: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Since: 3.0.0

Parameters

**variance1** `(number)` variance of the first list

**mean1** `(number)` mean of the first list

**n1** `(number)` number of items in the first list

**variance2** `(number)` variance of the second list

**mean2** `(number)` mean of the second list

**n2** `(number)` number of items in the second list

Returns

`number`: the combined mean

```
combineVariances(14 / 3, 5, 3, 8 / 3, 4, 3); // => 47 / 12
```

### subtractFromMean

When removing a value from a list, one does not have to necessary recompute the mean of the list in linear time. They can instead use this function to compute the new mean by providing the current mean, the number of elements in the list that produced it and the value to remove.

subtractFromMean(mean: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), n: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), value: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Since: 3.0.0

Parameters

**mean** `(number)` current mean

**n** `(number)` number of items in the list

**value** `(number)` the value to remove

Returns

`number`: the new mean

```
subtractFromMean(20.5, 6, 53); // => 14
```

### kernelDensityEstimation

[Kernel density estimation](https://en.wikipedia.org/wiki/Kernel_density_estimation) is a useful tool for, among other things, estimating the shape of the underlying probability distribution from a sample.

kernelDensityEstimation

Parameters

**X** `(any)` sample values

**kernel** `(any)` The kernel function to use. If a function is provided, it should return non-negative values and integrate to 1. Defaults to 'gaussian'.

**bandwidthMethod** `(any)` The "bandwidth selection" method to use, or a fixed bandwidth value. Defaults to "nrd", the commonly-used ["normal reference distribution" rule-of-thumb](https://stat.ethz.ch/R-manual/R-devel/library/MASS/html/bandwidth.nrd.html) .

Returns

`Function`: An estimated[probability density function](https://en.wikipedia.org/wiki/Probability_density_function)for the given sample. The returned function runs in`O(X.length)`.

### bisect

[Bisection method](https://en.wikipedia.org/wiki/Bisection_method) is a root-finding method that repeatedly bisects an interval to find the root.

This function returns a numerical approximation to the exact value.

bisect(func: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function), start: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), end: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), maxIterations: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), errorTolerance: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)): [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

Parameters

**func** `(Function)` input function

**start** `(number)` start of interval

**end** `(number)` end of interval

**maxIterations** `(number)` the maximum number of iterations

**errorTolerance** `(number)` the error tolerance

Returns

`number`: estimated root value

- [TypeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypeError): Argument func must be a function

Example

```
bisect(Math.cos,0,4,100,0.003); // => 1.572265625
```

### quickselect

Rearrange items in `arr` so that all items in `[left, k]` range are the smallest. The `k`-th element will have the `(k - left + 1)`-th smallest value in `[left, right]`.

Implements Floyd-Rivest selection algorithm https://en.wikipedia.org/wiki/Floyd-Rivest_algorithm

quickselect(arr: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>, k: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), left: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?, right: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?): void

Parameters

**arr** `(Array<number>)` input array

**k** `(number)` pivot index

**left** `(number?)` left index

**right** `(number?)` right index

Returns

`void`: mutates input array

```
var arr = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
quickselect(arr, 8);
// = [39, 28, 28, 33, 21, 12, 22, 50, 53, 56, 59, 65, 90, 77, 95]
```