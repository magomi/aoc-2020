import { play } from "."


test("tests part 1/1", () => {
  expect(play([0, 3, 6], 2020)).toBe(436);
})

test("tests part 1/2", () => {
  expect(play([1, 3, 2], 2020)).toBe(1);
})

test("tests part 1/3", () => {
  expect(play([2, 1, 3], 2020)).toBe(10);
})

test("tests part 1/4", () => {
  expect(play([1, 2, 3], 2020)).toBe(27);
})

test("tests part 1/5", () => {
  expect(play([2, 3, 1], 2020)).toBe(78);
})

test("tests part 1/6", () => {
  expect(play([3, 2, 1], 2020)).toBe(438);
})

test("tests part 1/2", () => {
  expect(play([3, 1, 2], 2020)).toBe(1836);
})

// test("tests part 2/1", () => {
//   expect(play([0, 3, 6], 30000000)).toBe(175594);
// })

// test("tests part 2/2", () => {
//   expect(play([1, 3, 2], 30000000, false)).toBe(2578);
// })

// test("tests part 2/3", () => {
//   expect(play([2, 1, 3], 30000000, false)).toBe(3544142);
// })

// test("tests part 2/4", () => {
//   expect(play([1, 2, 3], 30000000, false)).toBe(261214);
// })

// test("tests part 2/5", () => {
//   expect(play([2, 3, 1], 30000000, false)).toBe(6895259);
// })

// test("tests part 2/6", () => {
//   expect(play([3, 2, 1], 30000000, false)).toBe(18);
// })

// test("tests part 2/6", () => {
//   expect(play([3, 1, 2], 30000000, false)).toBe(362);
// })