
export function play(init: number[], turnCnt: number, log = false) {
  var nums = init;
  if (log) {
    console.log(`${nums}`)
  }
  var lastNum;
  while (nums.length <= turnCnt) {
    lastNum = nums[nums.length - 1];
    var lastIndex = nums.slice(0, nums.length - 1).lastIndexOf(lastNum);
    if (lastIndex > -1) {
      nums.push(nums.length  - 1 - lastIndex);
    } else {
      nums.push(0);
    }
    if (log) {
      console.log(`${nums[nums.length - 1]}`)
    }
  }
  return lastNum
}
console.log(`${play([20, 9, 11, 0, 1, 2], 2020, false)}`);