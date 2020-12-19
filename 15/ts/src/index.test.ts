import { play } from "."

test("tests 1", () => {
  expect(play([0, 3, 6], 2020, false)).toBe(436);
})

test("tests 2", () => {
  expect(play([1, 3, 2], 2020, false)).toBe(1);
})

test("tests 3", () => {
  expect(play([2, 1, 3], 2020, false)).toBe(10);
})

test("tests 4", () => {
  expect(play([1, 2, 3], 2020, false)).toBe(27);
})

test("tests 5", () => {
  expect(play([2, 3, 1], 2020, false)).toBe(78);
})

test("tests 6", () => {
  expect(play([3, 2, 1], 2020, false)).toBe(438);
})

