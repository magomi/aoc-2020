
export function play(init: number[], turnCnt: number) {
  var nums = init;
  var lastNum = nums[nums.length - 1];
  while (nums.length < turnCnt) {
    var lastIndex = nums.lastIndexOf(lastNum, nums.length - 2);
    lastNum = (lastIndex > -1 ? nums.length  - 1 - lastIndex : 0)
    nums.push(lastNum)
  }
  return nums[nums.length - 1];
}

// console.log(`${play([20, 9, 11, 0, 1, 2], 2020, false)}`);
// console.log(`${play([20, 9, 11, 0, 1, 2], 30000000, false)}`);