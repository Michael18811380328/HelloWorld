// https://leetcode.com/problems/two-sum/description/
module.exports = function (nums, target) {
    const arr = nums;
    const keyMap = {};
    for(let i = 0, len = arr.length; i < len; i++) {
        if (typeof keyMap[target - arr[i]] !== 'undefined') {
            return [keyMap[target - arr[i]], i]
        }
        keyMap[arr[i]] = i;
    }
    return [i, j];
};