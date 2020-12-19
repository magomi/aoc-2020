
export function play(init: number[], turnCnt: number) {
  var nums: Map<number, number> = new Map();
  for (var i = 0; i < init.length - 1; i++) {
    nums.set(init[i], i);
  }
  var lastNum = init[init.length - 1];
  var nextNum = 0;
  for (var i = init.length - 1; i < turnCnt - 1; i++) {
    var lastIndex = nums.get(lastNum);
    if (lastIndex == undefined) {
      nextNum = 0;
    } else {
      nextNum = i - lastIndex;
    } 
    nums.set(lastNum, i);
    lastNum = nextNum;
  }
  return lastNum;
}

console.log(`${play([20, 9, 11, 0, 1, 2], 2020)}`);
console.log(`${play([20, 9, 11, 0, 1, 2], 30000000)}`);